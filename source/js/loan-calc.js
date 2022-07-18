const loanCalculator = (function () {
  'use strict';
  let log = console.log;
  //cache DOM
  let amountSlider = document.querySelector('.js-amount-slider');
  let sliderAmountOutputElement = $('.js-slider-val-output');

  //slider settings
  const amountSliderSettings = {
    start: [7500],
    range: {
      'min': [100],
      'max': [25000],
    },
    step: 25,
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

  // currency format
  const currencyFormat = wNumb({
    prefix: '£',
    mark: '.',
    decimals: 2,
    thousand: ',',
  });

  //slider init
  noUiSlider.create(amountSlider, amountSliderSettings);

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

  return {
    writeSliderAmount: writeSliderAmount
  }

})();

loanCalculator.writeSliderAmount();









