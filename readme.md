# jquery.loan-calculator.js

[![Build Status](https://travis-ci.org/scrubmx/jquery.loan-calculator.svg?branch=master)](https://travis-ci.org/scrubmx/jquery.loan-calculator) [![Code Climate](https://codeclimate.com/github/scrubmx/jquery.loan-calculator/badges/gpa.svg)](https://codeclimate.com/github/scrubmx/jquery.loan-calculator)

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

**Create new instance:**
```js
var $calculator = $('#widget').loanCalculator();
```

**You can initialize with an options object:**
```js
$('#widget').loanCalculator({
    loanAmount   : 50000,
    loanDuration : 12,
    ...
});
```

## Event handling
The plugin handles all the `mousemove` and `change` jQuery events for you.
If you need to respond to other events you can call the `update` method inside your own event handler:
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
**All the posible options:**

* **loanAmount** 
  - Default: `50000`
  - Description: The loan amount
* **loanDuration** 
  - Default: `12`
  - Description: The loan duration
* **creditScore**
  - Default: `A`
  - Description: The credit score is taken from the `CREDIT_SCORE` object
* **interestRate:** 
  - Description: This value will override the `creditScore` 
* **loanAmountSelector** 
  - Default: `#loan-amount`
  - Description: Input where the user will choose the loan amount
* **loanDurationSelector**
  - Default: `#loan-duration`
  - Description: Input where the user will choose the loan duration
* **creditScoreSelector**
  - Default: `#credit-score`
  - Description: Input where the user will choose the credit score
* **selectedAmount**  
  - Default: `#selected-amount`
  - Description: Element to display the selected amount
* **selectedDuration**  
  - Default: `#selected-duration`
  - Description: Element to display the selected duration
* **selectedScore**        
  - Default: `#selected-score`
  - Description: Element to display the selected credit score
* **loanTotalSelector**
  - Default: `#loan-total`
  - Description: Element to display the resulting total loan cost
* **monthlyRateSelector**
  - Default: `#monthly-rate`
  - Description: Element to display the resulting monthly payment amount

## Development Setup

* Clone the repository
```bash
git clone git@github.com:scrubmx/jquery.loan-calculator.git

cd jquery.loan-calculator
```

* Install dependencies:
```bash
npm install
```

* Run the tests:
```bash
npm test
```


## Todo

* Document the public API
* Document all the posible option arguments
* Accept the following as options:
  - creditScores (JSON or URL)
  - ~~interestRate~~
  - minimumLoan 
  - minimumDuration
  - valueAddedTax

### License

jQuery Loan Calculator is open-sourced software licensed under the [MIT license](https://github.com/scrubmx/jquery.loan-calculator/blob/master/licence.txt)
