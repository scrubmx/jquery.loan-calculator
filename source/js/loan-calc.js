const loanCalculator = (function () {
  'use strict';
  const log = console.log;
  //cache DOM
  const amountSlider = document.querySelector('.js-amount-slider');
  const durationSlider = document.querySelector('.js-duration-slider');
  const sliderAmountOutputElement = $('.js-slider-val-output');

  // json data 
  const jsonResource = 'http://localhost:8888/wp/wp-content/plugins/build/loan-settings.json';
  
  // currency format
  const currencyFormat = wNumb({
    prefix: '£',
    mark: '.',
    decimals: 2,
    thousand: ',',
  });
  
  $.getJSON(jsonResource, function (data) {
    var amountSliderSettings;

    let results = data.filter(({ productCode }) =>
      productCode === ProductDefaults.product
    );

    results.forEach(el => {      
      amountSliderSettings = {
        start: el.defaultAmount,
        connect: 'lower',
        range: {
          'min': el.minAmount,
          'max': el.maxAmount,
        },
        step: el.step,
        pips: {
          mode: 'range',
          values: 2,
          density: 100,
          format: wNumb({
            prefix: '£',
            thousand: ',',
            decimals: 0
          })
        }
      }
    });

    //slider init
    noUiSlider.create(amountSlider, amountSliderSettings);
    noUiSlider.create(durationSlider, durationSliderSettings);

    // slider on change
    amountSlider.noUiSlider.on('update', function () {
      writeSliderAmount();
    });


    //write slider amount on page
    function writeSliderAmount() {
      let loanAmount = getLoanAmount();
      sliderAmountOutputElement.text(currencyFormat.to(loanAmount))
    }




    function getLoanAmount() {
      let loanAmount = Number(amountSlider.noUiSlider.get().replace(/\£|,/g, ''));
      return isNaN(loanAmount) ? 0 : loanAmount;
    }
    writeSliderAmount();
  });
  
  


  const durationSliderSettings ={    
    start: ProductDefaults.term,
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
        thousand: ',',
        suffix: ' months'
      })
    },
    range: {
      'min': 0,
      'max': 28
    }
  }





  return {
    //writeSliderAmount: writeSliderAmount
  }

})();

//loanCalculator.writeSliderAmount();









