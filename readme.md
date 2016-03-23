# jQuery Loan Calculator

[![Build Status](https://travis-ci.org/scrubmx/jquery.loan-calculator.svg?branch=master)](https://travis-ci.org/scrubmx/jquery.loan-calculator) [![Code Climate](https://codeclimate.com/github/scrubmx/jquery.loan-calculator/badges/gpa.svg)](https://codeclimate.com/github/scrubmx/jquery.loan-calculator)

## Basic Example 

* Create basic html with the following structure:
```html
<div id="widget">
    <input type="range" id="loan-amount" min="50000" max="250000" step="1000">
    <input type="range" id="loan-duration" min="12" max="36" step="1">
    <input id="credit-score" value="A">
    <h4 id="loan-total"></h4>
    <h4 id="monthly-rate"></h4>
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
      "vat": "$23.87"
   },
   {  
      "balance": "$0.00",
      "payment": "$5,130.15",
      "principal": "$5,042.89",
      "interest": "$75.22",
      "vat": "$12.04"
   }
]
```

## Options

* **loanAmount** 
  - Default: `50000`
  - Default Input: `#loan-amount`
  - Description: The loan amount
* **loanDuration** 
  - Default: `12`
  - Default Input: `#loan-duration`
  - Description: The loan duration
* **creditScore**
  - Default: `A`
  - Default Input: `#credit-score`
  - Description: If no interest rate is provided, then we will look for the provided `creditScore` in the `CREDIT_RATES` object.
* **interestRate:** 
  - Description: The annual interest rate for the loan. This value will override the `creditScore` option
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
* **valueAddedTax**
  - Default: None
  - Description: Value-added tax (VAT)

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

* ~~Document the public API~~
* ~~Document all the posible option arguments~~
* Accept the following as options:
  - creditScores (JSON or URL)
  - ~~interestRate~~
  - minimumLoan 
  - minimumDuration
  - ~~valueAddedTax~~

## License

jQuery Loan Calculator is open-sourced software licensed under the [MIT license](https://github.com/scrubmx/jquery.loan-calculator/blob/master/licence.txt)
