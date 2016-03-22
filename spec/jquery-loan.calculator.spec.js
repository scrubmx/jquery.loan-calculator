describe('jQuery LoanCalculator Plugin', function() {

  var $element, $loanTotal, $monthlyRate;

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/spec/fixtures';
    loadFixtures('fixture.html');

    $element     = $('#widget');
    $loanTotal   = $('#loan-total');
    $monthlyRate = $('#monthly-rate');
  });


  it('should find jQuery as $', function() {
    expect($).not.toBeNull();
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
    expect($monthlyRate.html()).toBe('$4,287.71');
  });


  it('calculates the correct interest rate', function() {
      $element.loanCalculator({
        loanAmount   : '$50,000.00',
        loanDuration : '36',
        creditScore  : 'A'
      });

      expect($loanTotal.html()).toBe('$54,206.61');
      expect($monthlyRate.html()).toBe('$1,505.74');
  });


  it('takes interest rate as optional parameter', function() {
    $element.loanCalculator({
      loanAmount   : '$50,000.00',
      loanDuration : '36',
      creditScore  : 'A',
      interestRate : '6.25%'
    });

    expect($loanTotal.html()).toBe('$54,963.61');
    expect($monthlyRate.html()).toBe('$1,526.77');
  });


  it('recalculates values when update maethod is called', function(){
    $element.loanCalculator({ loanAmount: 99999, loanDuration: 36 });
    $element.loanCalculator('update', { loanAmount: 50000, loanDuration: 36 })

    expect($loanTotal.html()).toBe('$54,206.61');
    expect($monthlyRate.html()).toBe('$1,505.74');
  });


  it('throws exception when invalid loanAmount value is supplied', function() {
    expect(function() {
      $element.loanCalculator({ loanAmount: 150 })
    })
    .toThrow(new Error(
      'The value provided for [loanAmount] must me at least 1000.'
    ));
  });


  it('throws exception when invalid loanDuration value is supplied', function() {
    expect(function() {
      $element.loanCalculator({ loanDuration: 0 })
    })
    .toThrow(new Error(
      'The value provided for [loanDuration] must me at least 1.'
    ));
  });


  it('throws exception when invalid creditScore value is supplied', function() {
    expect(function() {
      $element.loanCalculator({ creditScore: 'INVALID' })
    })
    .toThrow(new Error(
      'The value provided for [creditScore] is not a valid.'
    ));
  });


  it('supports multiple instances', function() {
    setFixtures(
      "<div id='widget1'><div id='loan-total1'></div><div>" +
      "<div id='widget2'><div id='loan-total2'></div><div>" +
      "<div id='widget3'><div id='loan-total3'></div><div>"
    );

    $('#widget1').loanCalculator({ loanAmount: 100000, loanTotalSelector: '#loan-total1' });
    $('#widget2').loanCalculator({ loanAmount: 55000.50, loanTotalSelector: '#loan-total2' });
    $('#widget3').loanCalculator({ loanAmount: '133000', loanTotalSelector: '#loan-total3' });

    expect($('#loan-total1').html()).toBe('$102,905.04');
    expect($('#loan-total2').html()).toBe('$56,598.28');
    expect($('#loan-total3').html()).toBe('$136,863.70');
  });


  it('supports the loanAmount in string (money) format', function() {
    setFixtures(
        "<div id='widget1'><div id='loan-total1'></div><div>" +
        "<div id='widget2'><div id='loan-total2'></div><div>"
    );

    $('#widget1').loanCalculator({ loanAmount: '50,000', loanTotalSelector: '#loan-total1' });
    $('#widget2').loanCalculator({ loanAmount: '$133,100.25', loanTotalSelector: '#loan-total2' });

    expect($('#loan-total1')).toHaveText('$51,452.52');
    expect($('#loan-total2')).toHaveText('$136,966.86');
  });


  it('supports css selectors for the results as options', function() {
    setFixtures(
      "<div id='test'>" +
        "<p id='total-container'></p>" +
        "<p id='monthly-rate-container'></p>" +
        "<p id='selected-credit-score'></p>" +
      "</div>"
    );

    $('#test').loanCalculator({
      loanAmount: '$120,000.00',
      loanDuration: '12 months',
      loanTotalSelector: '#total-container',
      monthlyRateSelector: '#monthly-rate-container'
    });

    expect($('#total-container')).toHaveText('$123,486.04');
    expect($('#monthly-rate-container')).toHaveText('$10,290.50');
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
    expect($monthlyRate.html()).toBe('$4,287.71');
  });


});
