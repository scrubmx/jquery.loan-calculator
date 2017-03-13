# jQuery Loan Calculator

[![Build Status](https://travis-ci.org/scrubmx/jquery.loan-calculator.svg?branch=master)](https://travis-ci.org/scrubmx/jquery.loan-calculator)
[![Code Climate](https://codeclimate.com/github/scrubmx/jquery.loan-calculator/badges/gpa.svg)](https://codeclimate.com/github/scrubmx/jquery.loan-calculator)
[![License](https://poser.pugx.org/pugx/badge-poser/license.svg)](https://github.com/scrubmx/jquery.loan-calculator/blob/master/licence.txt)

## Basic Example

* Create basic html with the following structure:
```html
<div id="widget">
    <input type="range" id="loan-amount" min="50000" max="250000" step="1000">
    <input type="range" id="loan-duration" min="12" max="36" step="1">
    <input id="credit-score" value="A">
    <h4 id="loan-total"></h4>
    <h4 id="payment"></h4>
</div>
```

* Create new instance:
```js
var $calculator = $('#widget').loanCalculator();
```

* You can initialize with an options object:
```js
$('#widget').loanCalculator({
  loanAmount: 50000,
  loanDuration: 12,
  ...
});
```

## Event handling

The plugin automatically handles all the `mousemove` and `change` input events for you.

#### update

* If you need to force the plugin to recalculate values use the `update` method:
```js
$calculator.loanCalculator('update');
```

* If you need to respond to other events you can call the `update` method inside your own event handler:
```js
$('#selector').on('myEvent', function(){
  $calculator.loanCalculator('update');
});
```

* You can pass overrides object as a second argument:
```js
$calculator.loanCalculator('update', {
  loanAmount: $('#other-loan-amount').val(),
  creditScore: 'A',
  valueAddedTax: '16%'
});
```

#### loan:update

* The plugin fires `loan:update` event when update method is called.
```js
// Event handler for the update method.
$calculator.on('loan:update', function(e) {
  //...
});
```

## Amortization Schedule

You can generate the amortization schedule as a json object:
```js
var json = $calculator.loanCalculator('schedule');
```

Example output:
```json
[
   {
      "balance": "$5,042.89",
      "payment": "$5,130.15",
      "principal": "$4,957.11",
      "interest": "$149.17",
      "tax": "$23.87"
   },
   {
      "balance": "$0.00",
      "payment": "$5,130.15",
      "principal": "$5,042.89",
      "interest": "$75.22",
      "tax": "$12.04"
   }
]
```

## Options

* **loanAmount**
  - Default: `50000`
  - Type: Number|String
  - Default Input: `#loan-amount`
  - Description: The loan amount.
* **loanDuration**
  - Default: `12`
  - Type: Number|String
  - Default Input: `#loan-duration`
  - Description: The loan duration expressed in months.
* **creditScore**
  - Default: `A`
  - Type: String
  - Default Input: `#credit-score`
  - Description: If no interest rate is provided, we search the `creditScore` key in the `CREDIT_RATES` object and use that interest rate.
* **creditRates**
  - Default: See default credit rates table
  - Type: Object
  - Description: The credit rates that will be used for the given `creditScore`
* **interestRate**
  - Default: None
  - Type: Number|String
  - Description: (Number) The annual interest rate for the loan.
  - Note: This value will override the `creditScore` option.
* **paymentFrequency**
  - Default: 'monthly'
  - Type: String
  - Description: (String) The frequency of payments for the loan.
  - Note: This option changes the interpretation what loanDuration means (12 weeks or 12 months)
* **valueAddedTax**
  - Default: `0`
  - Type: Number|String
  - Description: Value-added tax (VAT).
* **serviceFee**
  - Default: `0`
  - Type: Number|String
  - Description: (Number) The loan fees and commissions total.
* **loanAmountSelector**
  - Default: `#loan-amount`
  - Type: String (CSS selector)
  - Description: Input where the user will choose the loan amount.
* **loanDurationSelector**
  - Default: `#loan-duration`
  - Type: String (CSS selector)
  - Description: Input where the user will choose the loan duration.
* **creditScoreSelector**
  - Default: `#credit-score`
  - Type: String (CSS selector)
  - Description: Input where the user will choose the credit score.
* **selectedAmount**
  - Default: `#selected-amount`
  - Type: String (CSS selector)
  - Description: Element to display the selected amount.
* **selectedDuration**
  - Default: `#selected-duration`
  - Type: String (CSS selector)
  - Description: Element to display the selected duration.
* **selectedScore**
  - Default: `#selected-score`
  - Type: String (CSS selector)
  - Description: Element to display the selected credit score.
* **loanTotalSelector**
  - Default: `#loan-total`
  - Type: String (CSS selector)
  - Description: Element to display the resulting total loan cost.
* **interestTotalSelector**
  - Default: `#interest-total`
  - Type: String (CSS selector)
  - Description: Element to display the resulting total interest amount paid for the loan.
* **taxTotalSelector**
    - Default: `#tax-total`
    - Type: String (CSS selector)
    - Description: Element to display the resulting total tax amount paid for the loan.
* **paymentSelector**
  - Default: `#payment`
  - Type: String (CSS selector)
  - Description: Element to display the periodic payment amount.
* **totalAnnualCostSelector**
  - Default: `#total-annual-cost`
  - Type: String (CSS selector)
  - Description: Element to display the resulting total annual cost (CAT).
* **serviceFeeSelector**
  - Default: `#service-fee`
  - Type: String (CSS selector)
  - Description: Element to display the service fee total.

## Default credit rates

| Grade | Value |
| ----- | ----- |
| A | 5.32 | A1 |
| B | 8.18 | B1 |
| C | 12.29 | C1 |
| D | 15.61 | D1 |
| E | 18.25 | E1 |
| F | 21.99 | F1 |
| G | 26.77 | G1 |


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

* Accept the following as options:
  - creditScores (URL)
  - minimumLoan
  - minimumDuration

## License

jQuery Loan Calculator is open-sourced software licensed under the [MIT license](https://github.com/scrubmx/jquery.loan-calculator/blob/master/licence.txt)
