const loanCalculator = (function () {
  'use strict';
  const log = console.log;
  //Cache DOM
  const amountSlider = document.querySelector('.js-amount-slider');
  const durationSlider = document.querySelector('.js-duration-slider');
  const sliderAmountOutputElement = $('.js-slider-val-output');
  const termOutputElement = $('.js-selected-term');

  // JSON Data 
  const jsonResource = 'http://localhost:8888/wp/wp-content/plugins/build/loan-settings.json';
  
  // Currency Format
  const currencyFormat = wNumb({
    prefix: '£',
    mark: '.',
    decimals: 0,
    thousand: ',',
  });
  
  $.getJSON(jsonResource, function (data) {
    var amountSliderSettings,
        durationSliderSettings;

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
        format: currencyFormat,
        variableTerms: el.variableTerms
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
          suffix: ' months'
        })
      };
    });

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
      sliderAmountOutputElement.text(currencyFormat.to(loanAmount))
    }

    function getLoanAmount() {
      let loanAmount = Number(amountSlider.noUiSlider.get().replace(/\£|,/g, ''));
      return isNaN(loanAmount) ? 0 : loanAmount;
    }

    //Write term on page
    function writeSelectedPaymentTerm(){
      let selectedPaymentTerm = durationSlider.noUiSlider.get();
      termOutputElement.text(selectedPaymentTerm);
    }
  });

  return {
    //writeSliderAmount: writeSliderAmount
  }

})();










