# jquery.loan-calculator.js

### Development Installation
**Install dependencies**
```bash
node install
```

**Run the tests**
```bash
karma start
```

### Basic Instructions
**Basic example.html**
```html
<div id="calculator">
    <input id="loan-amount">
    <input id="loan-duration">
    <input id="credit-score">
    <p id="loan-total"></p>
    <p id="monthly-rate"></p>
</div>
```

**Create new instance on a `#calculator` element**
```js
$('#calculator').loanCalculator({
  // default values for a loan
  loanAmount: 10000,
  loanDuration: 24,
  creditScore: 'A',

  // change the template selectors
  loanTotalSelector: '#loan-total',
  monthlyRateSelector: '#monthly-rate'
});
```

**Attach any number of event handlers**
```js
$('#loan-amount, #loan-duration, #credit-score').change(function(){
    $('#calculator').loanCalculator();
});
```
