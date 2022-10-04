const loanCalculator = (function () {
  'use strict';

  //Cache DOM
  const log = console.log,
        amountSlider = document.querySelector('.js-amount-slider'),
        durationSlider = document.querySelector('.js-duration-slider'),
        sliderAmountOutputElement = $('.js-slider-val-output'),
        termOutputElement = $('.js-selected-term'),

        dispLoanAmount = $('.js-disp-loan-amount'),
        dispLoanTerm = $('.js-disp-term'),
        dispMonthlyRepayment = $('.js-disp-monthly-repayment'),
        dispAPR = $('.js-disp-apr'),
        dispTotalCost = $('.js-disp-total-cost'),
        dispTotalRepayable = $('.js-disp-total-repayable');

  let termVariation,rateVariation;
      termVariation = rateVariation = null;

  
  //Hide calc on load if product code is SAV
  if(ProductDefaults.product == 'SAV'){
    $('.calc__sliders, .calc__right').hide();
  }

  // JSON Data 
  const jsonResource = 'http://localhost:8888/wp/wp-content/plugins/build/loan-settings.json';
  
  // Currency Format
  const currencyFormat = wNumb({
    prefix: '£',
    mark: '.',
    decimals: 0,
    thousand: ','
  });

  const currencyFormatWithDecimal = wNumb({
    prefix: '£',
    decimals: 2,
    thousand: ','
  });
  
  $.getJSON(jsonResource, function (data) {
    var amountSliderSettings,
        durationSliderSettings;

    let valueStore = {};
    
    //assign values from the matching JSON node to the results variable
    let results = data.filter(({ productCode }) =>
      productCode === ProductDefaults.product
    );

    results.forEach(el => {      
      amountSliderSettings = {
        start: el.defaultAmount,
        connect: 'lower',
        animate: true,
        range: {
          'min': el.minAmount,
          'max': el.maxAmount,
        },
        step: el.step,
        pips: {
          mode: 'range',
          values: 2,
          density: 100,
          format: currencyFormat
        },
        format: currencyFormat
      };

      durationSliderSettings = {
        start: el.defaultTerm,
        animate: true,
        connect: [true, false],
        //connect: 'lower',
        step: 1,
        pips: {
          mode: 'positions',
          values: [0, 100],
          density: 100,
          format: wNumb({
            decimals: 0,
            suffix: ' months'
          })
        },
        range: {
          'min': el.minTerm,
          'max': el.maxTerm
        },
        format: wNumb({
          decimals: 0,
          //suffix: ' months'
        })
      };      
      termVariation = el.variableTerms;
      rateVariation = el.variableRates;
      valueStore.product = el.productCode;
    });

    //assign min loan amount
    function assignMinLoanAmount() {
      if(valueStore.product =='SAV'){

      }
    }

    //Slider init
    noUiSlider.create(amountSlider, amountSliderSettings);
    noUiSlider.create(durationSlider, durationSliderSettings);

    // Slider on change
    amountSlider.noUiSlider.on('update', function () {
      writeSliderAmount();
    });

    durationSlider.noUiSlider.on('update', function () {
      writeSelectedPaymentTerm();
    });

    //Write slider amount on page
    function writeSliderAmount() {
      let loanAmount = getLoanAmount();      
      updateTermBasedOnValue(loanAmount);
      updateRatesBasedOnValue(loanAmount);
      valueStore.loanAmount = loanAmount;
      writeValuesOnPage();      
    }

    //Write term on page
    function writeSelectedPaymentTerm() {
      valueStore.paymentTerm = durationSlider.noUiSlider.get();
      writeValuesOnPage();
    }

    function getLoanAmount() {
      let loanAmount = Number(amountSlider.noUiSlider.get().replace(/\£|,/g, ''));
      return isNaN(loanAmount) ? 0 : loanAmount;
    }

    //change the payment terms slider based on loan amount
    function updateTermBasedOnValue(val){
      if(valueStore.product == 'PER'){
        durationSlider.noUiSlider.updateOptions({
          range: {
            'min': getMinMaxBasedOnValue(val, termVariation).min,
            'max': getMinMaxBasedOnValue(val, termVariation).max
          }
        });
      }
    }

    function updateRatesBasedOnValue(val){
      valueStore.apr = valueStore.product == 'PER'? getAprBasedOnValue(val, rateVariation) : results[0].rate;
      valueStore.aprForPmt = convertAprForPmt(valueStore.apr);      
    }
    
    function calcMonthlyPayment(){
      let monthlyPayment = pmt(valueStore.aprForPmt, valueStore.paymentTerm, -(valueStore.loanAmount));
      valueStore.monthlyPayment = monthlyPayment.toFixed(2);
      calcTotalRepayable();
    }

    function calcTotalRepayable(){
      valueStore.totalRepayable = (valueStore.monthlyPayment * valueStore.paymentTerm).toFixed(2);
      calcTotalCostOfLoan();
    }

    function calcTotalCostOfLoan(){
      valueStore.totalCostOfLoan = (valueStore.totalRepayable - valueStore.loanAmount).toFixed(2);
    }

    function writeValuesOnPage() {
      dispLoanAmount.text(convertValsForDisplay(valueStore.loanAmount));
      sliderAmountOutputElement.text(currencyFormat.to(valueStore.loanAmount));
      dispLoanTerm.text(valueStore.paymentTerm);
      termOutputElement.text(monthsToYears(valueStore.paymentTerm));
      dispAPR.text(valueStore.apr);
      calcMonthlyPayment();
      dispMonthlyRepayment.text(convertValsForDisplay(valueStore.monthlyPayment)); 
      dispTotalRepayable.text(convertValsForDisplay(valueStore.totalRepayable));
      dispTotalCost.text(convertValsForDisplay(valueStore.totalCostOfLoan));
    }

    function convertValsForDisplay(val){
      return currencyFormatWithDecimal.to(parseFloat(val));
    }

    function getSaverLoanSavingsAmount() {
      valueStore.minAmount = results[0].minAmount;
      $('.js-con-saved-amt-input').on('blur', function () {
        let selectedVal = Number($(this).val());
        if (selectedVal > valueStore.minAmount) {          
          $('.calc__sliders, .calc__right').show();
          amountSlider.noUiSlider.updateOptions({
            range: {
              'min': valueStore.minAmount,
              'max': selectedVal
            },
            start: selectedVal
          });
        }
        else {
          $('.calc__sliders, .calc__right').hide();
        }
      });
    }
    getSaverLoanSavingsAmount();


  });

  let convertAprForPmt = function(apr){
    return apr/100/12;
  }

  let getMinMaxBasedOnValue = function (value, obj) {
    let minTerm,
        maxTerm;

    for(let prop in obj){
      if (value < prop && obj.hasOwnProperty(prop)){
        minTerm = obj[prop].minTerm;
        maxTerm = obj[prop].maxTerm;
        
        let termObj = {
          min: minTerm,
          max: maxTerm
        };
        return termObj;
      }
    }
  };

  let getAprBasedOnValue = function(value, obj){
    var apr;
    for (let prop in obj){
      if (value <= prop && obj.hasOwnProperty(prop)) {
        apr = obj[prop].apr;
        return apr;
      }
    }
  }

  let monthsToYears = function (value) {
    let months = {
        one: 'month',
        other: 'months'
      },
      years = {
        one: 'year',
        other: 'years'
      },
      m = value % 12,
      y = Math.floor(value / 12),
      result = [];

    y && result.push(y + ' ' + getPlural(y, years));
    m && result.push(m + ' ' + getPlural(m, months));
    return result.join(' and ');

    function getPlural(number, word) {
      return number === 1 && word.one || word.other;
    }
  }

  let pmt = function (rate, nper, pv, fv, type) {
    if (!fv) fv = 0;
    if (!type) type = 0;

    if (rate == 0) return -(pv + fv) / nper;

    var pvif = Math.pow(1 + rate, nper);
    var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type == 1) {
      pmt /= (1 + rate);
    };
    return pmt;
  }


})();

