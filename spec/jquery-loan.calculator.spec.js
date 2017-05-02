describe('jQuery Loan Calculator Plugin', function() {

  var $element, $loanTotal, $payment;

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/spec/fixtures';

    loadFixtures('fixture.html');

    $element         = $('#widget');
    $loanTotal       = $('#loan-total');
    $payment         = $('#payment');
    $totalAnnualCost = $('#total-annual-cost');
    $serviceFee      = $('#service-fee');
    $grandTotal      = $('#grand-total');
  });


  it('should initialize', function() {
    $element.loanCalculator();

    expect($element.data('plugin_loanCalculator')).toEqual(
      jasmine.objectContaining({ _name: 'loanCalculator' })
    );
  });


  it('can initialize with the default values', function() {
    $element.loanCalculator();

    expect($loanTotal.html()).toBe('$51,452.52');
    expect($payment.html()).toBe('$4,287.71');
  });


  it('calculates the correct values for a given credit score', function() {
      $element.loanCalculator({
        loanAmount   : '$50,000.00',
        loanDuration : '36',
        creditScore  : 'A'
      });

      expect($loanTotal.html()).toBe('$54,206.61');
      expect($payment.html()).toBe('$1,505.74');
  });


  it('calculates the correct values for a given interest rate', function() {
    $element.loanCalculator({
      loanAmount   : '$50,000.00',
      loanDuration : '36',
      interestRate : '16%'
    });

    expect($loanTotal.html()).toBe('$63,282.66');
    expect($payment.html()).toBe('$1,757.85');
  });


  it('calculates the correct total annual cost (CAT)', function() {
    $element.loanCalculator({
      loanAmount    : '$50,000.00',
      loanDuration  : '12',
      interestRate  : '17.9%',
      valueAddedTax : '16%',
      serviceFee    : '5%'
    });

    expect($totalAnnualCost.html()).toBe('31.70%');

    $element.loanCalculator('update', {
      loanDuration     : '1',
      paymentFrequency : 'weekly',
    });

     expect($totalAnnualCost.html()).toBe('249.97%');
  });

  it('calculates the correct grand total cost', function() {
    $element.loanCalculator();

    expect($grandTotal.html()).toBe('$51,452.52');
  });


  it('can update the total annual cost (CAT) selector', function() {
    setFixtures("<div id='widget1'><p id='cat'></p><div>");

    $('#widget1').loanCalculator({
      loanAmount              : '$50,000.00',
      loanDuration            : '12',
      interestRate            : '17.9%',
      valueAddedTax           : '16%',
      serviceFee              : '5%',
      totalAnnualCostSelector : '#cat'
    });

    expect($('#cat').html()).toBe('31.70%');
  });


  it('can update the grand total selector', function() {
    setFixtures('<div id="widget1"><p id="custom-grand-total"></p></div>');

    $('#widget1').loanCalculator({
      'loanGrandTotalSelector': '#custom-grand-total',
    });

    expect($('#custom-grand-total').html()).toBe('$51,452.52');
  });


  it('can update the selected payment frequency selector', function() {
    setFixtures('<div id="widget1"><p id="custom-payment-frequency"></p></div>');

    $('#widget1').loanCalculator({
      'paymentFrequency': 'weekly',
      'selectedPaymentFrequency': '#custom-payment-frequency',
    });

    expect($('#custom-payment-frequency').html()).toBe('weekly');
  });


  it('supports the interestRate in string or numeric format ', function() {
    // can optionally append the '%' sign to the interestRate
    $element.loanCalculator({
      loanAmount   : '$50,000.00',
      loanDuration : '36',
      interestRate : '16%'
    });

    expect($loanTotal.html()).toBe('$63,282.66');
    expect($payment.html()).toBe('$1,757.85');

    // supports integer format
    $element.loanCalculator('update', { interestRate: 25 });

    expect($loanTotal.html()).toBe('$71,567.69');
    expect($payment.html()).toBe('$1,987.99');

    // supports floating point format
    $element.loanCalculator('update', { interestRate: 0.33 });

    expect($loanTotal.html()).toBe('$79,400.38');
    expect($payment.html()).toBe('$2,205.57');
  });


  it('overrides the credit score when an interest rate parameter is supplied', function() {
    $element.loanCalculator({
      loanAmount   : '$50,000.00',
      loanDuration : '36',
      creditScore  : 'A',
      interestRate : '25%'
    });

    expect($loanTotal.html()).toBe('$71,567.69');
    expect($payment.html()).toBe('$1,987.99');
  });


  it('has a weekly payment frequency option', function() {
    $element.loanCalculator({
      loanAmount       : '$50,000.00',
      loanDuration     : '52',
      interestRate     : '19%',
      valueAddedTax    : '16%',
      paymentFrequency : 'weekly'
    });

    expect($loanTotal.html()).toBe('$77,672.75');
    expect($payment.html()).toBe('$345.21');
  });


  it('has a biweekly payment frequency option', function() {
    $element.loanCalculator({
      loanAmount       : '$50,000.00',
      loanDuration     : '52',
      interestRate     : '19%',
      valueAddedTax    : '16%',
      paymentFrequency : 'biweekly'
    });

    expect($loanTotal.html()).toBe('$77,632.42');
    expect($payment.html()).toBe('$693.15');
  });


  it('calculates correct total annual cost when different payment frequencies are provided', function() {
    $element.loanCalculator({
      loanAmount       : '$50,000.00',
      loanDuration     : '52',
      interestRate     : '19%',
      valueAddedTax    : '16%',
      paymentFrequency : 'weekly',
      serviceFee       : '5%'
    });

    expect($totalAnnualCost.html()).toBe('24.21%');
  });


  it('has an update method', function() {
    var plugin = $element.loanCalculator().data('plugin_loanCalculator');

    expect(typeof plugin.update).toBe('function')
  });


  it('can call the method update with no arguments', function() {
    $element.loanCalculator({
      loanAmount   : 40000,
      loanDuration : 12,
      interestRate : 5.32
    });

    // this call should have no effect on the results
    $element.loanCalculator('update');

    expect($loanTotal.html()).toBe('$41,162.01');
    expect($payment.html()).toBe('$3,430.17');
  });


  it('takes an overrides object as a second argument when calling the update method', function() {
    $element.loanCalculator({
      loanAmount: 999999, loanDuration: 36, interestRate : 5.32
    });

    $element.loanCalculator('update', { loanAmount: 50000 });

    expect($loanTotal.html()).toBe('$54,206.61');
    expect($payment.html()).toBe('$1,505.74');

    $element.loanCalculator('update', { interestRate: 8.18 });

    expect($loanTotal.html()).toBe('$56,555.04');
    expect($payment.html()).toBe('$1,570.97');
  });


  it('throws exception when invalid payment frequency is provided', function() {
    expect(function() {
      $element.loanCalculator({ paymentFrequency: 'NON-EXISTING' })
    })
      .toThrow(new Error(
          'The value provided for [paymentFrequency] is not valid.'
      ));
  });


  it('throws exception when invalid loanAmount is supplied', function() {
    expect(function() {
      $element.loanCalculator({ loanAmount: 150 })
    })
    .toThrow(new Error(
      'The value provided for [loanAmount] must me at least 1000.'
    ));
  });


  it('throws exception when invalid loanDuration is supplied', function() {
    expect(function() {
      $element.loanCalculator({ loanDuration: 0 })
    })
    .toThrow(new Error(
      'The value provided for [loanDuration] must me at least 1.'
    ));
  });


  it('throws exception when invalid creditScore is supplied', function() {
    expect(function() {
      $element.loanCalculator({ creditScore: 'INVALID' })
    })
    .toThrow(new Error(
      'The value provided for [creditScore] is not valid.'
    ));
  });


  it('throws exception when invalid serviceFee is supplied', function() {
    expect(function() {
      $element.loanCalculator({ serviceFee: 'INVALID' })
    })
    .toThrow(new Error(
      'The value provided for [serviceFee] is not valid.'
    ));
  });


  it('throws exception when it has an invalid credit rate', function() {
    expect(function () {
      $element.loanCalculator({
        creditRates: 'INVALID'
      })
    }).toThrow(new Error(
      'The value provided for [creditRates] is not valid.'
    ));

    expect(function () {
      $element.loanCalculator({
        creditRates: {
          A: 'INVALID'
        }
      })
    })
    .toThrow(new Error(
      'The value provided for [creditRates] is not valid.'
    ));
  });


  it('supports multiple instances', function() {
    setFixtures(
      "<div id='widget1'><div id='loan-total1'></div><div>" +
      "<div id='widget2'><div id='loan-total2'></div><div>" +
      "<div id='widget3'><div id='loan-total3'></div><div>"
    );

    $('#widget1').loanCalculator({
      loanAmount: 100000, loanTotalSelector: '#loan-total1'
    });

    $('#widget2').loanCalculator({
      loanAmount: 55000.50, loanTotalSelector: '#loan-total2'
    });

    $('#widget3').loanCalculator({
      loanAmount: '133000', loanTotalSelector: '#loan-total3'
    });

    expect($('#loan-total1').html()).toBe('$102,905.04');
    expect($('#loan-total2').html()).toBe('$56,598.28');
    expect($('#loan-total3').html()).toBe('$136,863.70');
  });


  it('supports the loanAmount in string (money) format', function() {
    setFixtures(
        "<div id='widget1'><div id='loan-total1'></div><div>" +
        "<div id='widget2'><div id='loan-total2'></div><div>"
    );

    $('#widget1').loanCalculator({
      loanAmount: '50,000', loanTotalSelector: '#loan-total1'
    });

    $('#widget2').loanCalculator({
      loanAmount: '$133,100.25', loanTotalSelector: '#loan-total2'
    });

    expect($('#loan-total1')).toHaveText('$51,452.52');
    expect($('#loan-total2')).toHaveText('$136,966.86');
  });


  it('supports css selectors for the results as options', function() {
    setFixtures(
      "<div id='test'>" +
        "<p id='total-container'></p>" +
        "<p id='payment-container'></p>" +
        "<p id='selected-credit-score'></p>" +
        "<p id='interest-total-container'></p>" +
        "<p id='tax-total-container'></p>" +
      "</div>"
    );

    $('#test').loanCalculator({
      loanAmount: 50000,
      interestRate: 0.0532,
      loanDuration: 12,
      valueAddedTax: 0.16,
      loanTotalSelector: '#total-container',
      paymentSelector: '#payment-container',
      interestTotalSelector: '#interest-total-container',
      taxTotalSelector: '#tax-total-container',

    });

    expect($('#total-container').html()).toBe('$51,687.08');
    expect($('#payment-container').html()).toBe('$4,307.26');
    expect($('#interest-total-container').html()).toBe('$1,454.38');
    expect($('#tax-total-container').html()).toBe('$232.70');
  });


  it('supports jquery fluent chainable syntax', function() {
    $element.addClass('active')
            .loanCalculator({ loanAmount: '50000' })
            .attr('test', 'testing');

    expect($loanTotal).toHaveText('$51,452.52');
    expect($element).toHaveClass('active');
    expect($element).toHaveAttr('test');
  });


  it('handles DOM events and recalculates the results', function() {
    $element.loanCalculator({ loanAmount: '$120,000.00' });

    $('#loan-amount').val('50000').trigger('change');

    expect($loanTotal.html()).toBe('$51,452.52');
    expect($payment.html()).toBe('$4,287.71');
  });


  it('can receive value added tax as a parameter', function() {
    $element.loanCalculator({
      loanAmount    : '$50,000.00',
      loanDuration  : '12',
      interestRate  : '17.9%',
      valueAddedTax : '16%'
    });

    expect($loanTotal.html()).toBe('$55,800.33');

    $element.loanCalculator('update', { valueAddedTax: 0.16 });

    expect($loanTotal.html()).toBe('$55,800.33');
  });


  it('displays the correct service fee total', function() {
    $element.loanCalculator({ loanAmount: '$50,000.00' });
    expect($serviceFee.html()).toBe('$0.00');

    $element.loanCalculator('update', { serviceFee: '5%' });
    expect($serviceFee.html()).toBe('$2,500.00');

    $element.loanCalculator('update', { serviceFee: '5%', valueAddedTax: '16%'});
    expect($serviceFee.html()).toBe('$2,900.00');
  });


  it('shows the right total for service fee zero', function() {
    $element.loanCalculator({
      loanAmount    : '$50,000.00',
      loanDuration  : '12',
      interestRate  : '17.9%',
      valueAddedTax : '16%',
      serviceFee    : '0%'
    });

    expect($serviceFee.html()).toBe('$0.00');
    expect($loanTotal.html()).toBe('$55,800.33');
  });


  it('can update the service fee selector', function() {
    setFixtures("<div id='widget1'><p id='commission'></p><div>");

    $('#widget1').loanCalculator({
      loanAmount: '$50,000.00',
      serviceFeeSelector: '#commission',
      serviceFee: '5%'
    });

    expect($('#commission').html()).toBe('$2,500.00');
  });


  it('has an schedule method', function() {
    var plugin = $element.loanCalculator().data('plugin_loanCalculator');

    expect(typeof plugin.schedule).toBe('function')
  });


  it('returns a json object with the amortization schedule', function() {
    $element.loanCalculator({
      loanAmount    : '$50,000.00',
      loanDuration  : '12',
      interestRate  : '17.9%',
      valueAddedTax : '16%'
    });

    var schedule = $element.loanCalculator('schedule');

    expect(schedule[0]).toEqual({
      initial: '$50,000.00',
      principal: '$3,784.86',
      interest: '$745.83',
      tax: '$119.33',
      payment: '$4,650.03',
      balance: '$46,215.14'
    })

    expect(schedule[11]).toEqual({
      initial   : '$4,570.93',
      principal : '$4,570.93',
      interest  : '$68.18',
      tax       : '$10.91',
      payment   : '$4,650.03',
      balance   : '$-0.00'
    })
  });


  it('it can return the credit rates being used', function() {
    $element.loanCalculator();

    expect({
      'A': 5.32,
      'B': 8.18,
      'C': 12.29,
      'D': 15.61,
      'E': 18.25,
      'F': 21.99,
      'G': 26.77,
    }).toEqual($element.loanCalculator('rates'));
  });


  it('can receive credit rates as a parameter', function() {
    $element.loanCalculator({
      creditScore: 'A',
      creditRates: {
        'A': 12
      }
    });

    expect($loanTotal.html()).toBe('$53,309.27');
    expect({'A': 12}).toEqual($element.loanCalculator('rates'));

    $element.loanCalculator('update', {
      creditScore: 'A',
      creditRates: {
        'A': '12%'
      }
    });

    expect($loanTotal.html()).toBe('$53,309.27');
    expect({'A': 12}).toEqual($element.loanCalculator('rates'));

    $element.loanCalculator('update', {
      creditScore: 'A',
      creditRates: {
        'A': 0.12,
      }
    });

    expect($loanTotal.html()).toBe('$53,309.27');
    expect({'A': 12}).toEqual($element.loanCalculator('rates'));
  });


  it('returns a json object with the amortization schedule with equal payments', function() {
    $element.loanCalculator();

    var schedule = $element.loanCalculator('schedule');

    schedule.forEach(function (period) {
      expect(period['payment']).toBe('$4,287.71');
    });
  });

});
