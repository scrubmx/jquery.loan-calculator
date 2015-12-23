# jquery.loan-calculator.js

[![Build Status](https://travis-ci.org/scrubmx/jquery.loan-calculator.svg?branch=master)](https://travis-ci.org/scrubmx/jquery.loan-calculator)

## Development Installation
**Install dependencies**
```bash
node install
```

**Run the tests**
```bash
karma start
```

## Basic Example
**Create basic html with the following structure:**
```html
<div id="widget">
    <input type="range" id="loan-amount" min="50000" max="250000" step="1000">
    <input type="range" id="loan-duration" min="12" max="36" step="1">
    <input id="credit-score" value="A">
    <h4 id="loan-total"></h4>
    <h4 id="monthly-rate"></h4>
</div>
```

**Create new instance**
```js
var $calculator = $('#widget').loanCalculator();
```


* The plugin handles all the `mousemove` and `change` jQuery events.
* If you need to attach other events you can call the `update` method like so:
```js
$('#selector').on('myEvent', function(){

  $calculator.loanCalculator('update', {
    loanAmount   : $('#loan-amount').val(),
    loanDuration : $('#loan-duration').val(),
    creditScore  : $('#credit-score').val()
  });

});
```

## Options
Default values for all the posible options:
```js
$('#widget').loanCalculator({
    // default values for a loan
    loanAmount           : 50000,
    loanDuration         : 12,
    creditScore          : 'A',

    // inputs
    loanAmountSelector   : '#loan-amount',
    loanDurationSelector : '#loan-duration',
    creditScoreSelector  : '#credit-score',

    // display selected values
    selectedAmount       : '#selected-amount',
    selectedDuration     : '#selected-duration',
    selectedScore        : '#selected-score',

    // show the results
    loanTotalSelector    : '#loan-total',
    monthlyRateSelector  : '#monthly-rate'
});
```


## Todo

* Document the public API
* Document all the posible option arguments
* Accept the following as options:
  * creditRates (JSON or URL)
  * minimumLoan 
  * minimumDuration
  * valueAddedTax

### License

jQuery Loan Calculator is open-sourced software licensed under the [MIT license](https://github.com/scrubmx/jquery.loan-calculator/blob/master/licence.txt)