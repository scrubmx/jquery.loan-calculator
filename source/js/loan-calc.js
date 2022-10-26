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

    if(valueStore.product !== 'CON'){
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
    }

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
      valueStore.apr = (valueStore.product == 'PER' || valueStore.product == 'HOM') ? getAprBasedOnValue(val, rateVariation) : results[0].rate;
    }
    
    function calcMonthlyPayment(){
      let caclResults = pmtFunc(valueStore.apr, valueStore.paymentTerm, valueStore.loanAmount);
      valueStore.monthlyPayment = caclResults.monthly;
      valueStore.totalRepayable = valueStore.monthlyPayment * valueStore.paymentTerm;
      valueStore.totalCostOfLoan = caclResults.cost;
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
              'max': selectedVal <= results[0].maxAmount ? selectedVal : results[0].maxAmount
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

  let pmtFunc = function (intRate,term,loanAmt) {
    let monthlyIntRate = monthlyApr(intRate) / 100;
    let loanRepayment = monthlyIntRate * Math.pow(1 + monthlyIntRate, term);
    loanRepayment = loanRepayment / ((Math.pow(1 + monthlyIntRate, term)) - 1);
    loanRepayment = loanRepayment * loanAmt;

    let cost = (loanRepayment * term) - loanAmt;
    return {
      total: loanRepayment * term,
      monthly: loanRepayment,
      cost: cost
    };
  };




  function NPER(rate, payment, present, future, type) {
    // Initialize type

    //rate = monthlyApr(rate);
    type = (typeof type === 'undefined') ? 0 : type;

    // Initialize future value
    future = (typeof future === 'undefined') ? 0 : future;

    // Return number of periods
    const num = payment * (1 + rate * type) - future * rate;
    const den = (present * rate + payment * (1 + rate * type));
    return Math.log(num / den) / Math.log(1 + rate);
  }

 

  let monthlyApr = function (apr) {
    var apr = 1 + apr / 100;
    apr = Math.pow(apr, 1 / 12) - 1;
    return apr * 100;
  };

  log(NPER(16.45, 50, 300));

  let consolidationLoanEvents = (function(){
    //add row
    $('.js-add-debt-input-row').on('click', function(e){
      e.preventDefault();
      $('.con-items__repeater--original').clone()
        .removeClass('con-items__repeater--original')
        .insertBefore('.js-add-debt-input-row')
        .find('input').val('');      
    });

    //remove row
    $('.con-items').on('click','.js-con-item-delete', function(e){
      e.preventDefault();
      $(this).closest('.con-items__repeater').remove();
      calcRepaymentSum();
    });

    //calculate repayment sum 
    $('.con-items').on('blur', '.js-repayment-input', function () {
      calcRepaymentSum();      
    });

    let conValues = {};
    function calcRepaymentSum(){
      let sum = 0;
      $('.js-repayment-input').each(function () {
        let val = $.trim($(this).val());
        if (val) {
          val = parseFloat(val.replace(/^\£/, ""));
          sum += !isNaN(val) ? val : 0;
        }
      });
      conValues.repaymentSum = sum;  
      displayValues();   
    }

    function displayValues(){
      $('.js-repayment-total-input').val(conValues.repaymentSum);
    }

  })();


})();

