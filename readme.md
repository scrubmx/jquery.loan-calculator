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

**Attach any number of event handlers**
```js
$('#loan-amount, #loan-duration, #credit-score').change(function() {
  updateCalculator();
});

$('#loan-amount, #loan-duration').mousemove(function () {
  updateCalculator();
});

function updateCalculator() {
  $('#widget').loanCalculator({
    loanAmount: $('#loan-amount').val(),
    loanDuration: $('#loan-duration').val(),
    creditScore: $('#credit-score').val()
  });
}
```


## Todo

* Document the public API.
* Move the event handlers inside the plugin

### License

jQuery Loan Calculator is open-sourced software licensed under the [MIT license](https://github.com/scrubmx/jquery.loan-calculator/blob/master/licence.txt)