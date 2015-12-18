describe('jQuery LoanCalculator Plugin', function() {


  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/spec/fixtures';
    loadFixtures('fixture.html');
  });


  it('Should find jQuery', function() {
    expect($).not.toBeNull();
  });


  it('can initialize with the default values', function() {
    $('#widget').loanCalculator();
    expect($('#loan-total')).toHaveText('$52,660.00');
  });


  it('Should calculate the correct interest rate', function() {
      $('#widget').loanCalculator({
        loanAmount   : '50000',
        loanDuration : '36',
        creditScore  : 'A'
      });

      expect($('#loan-total')).toHaveText('$52,660.00');
      expect($('#monthly-rate')).toHaveText('$1,462.78');
  });


  it('throws exception when invalid loanAmount value is supplied', function() {
    expect(function() {
      $('#widget').loanCalculator({ loanAmount: 150 })
    })
    .toThrow(new Error(
      'The value provided for [loanAmount] must me at least 10000.'
    ));
  });


  it('throws exception when invalid loanDuration value is supplied', function() {
    expect(function() {
      $('#widget').loanCalculator({ loanDuration: 2 })
    })
    .toThrow(new Error(
      'The value provided for [loanDuration] must me at least 6.'
    ));
  });


  it('throws exception when invalid creditScore value is supplied', function() {
    expect(function() {
      $('#widget').loanCalculator({ creditScore: 'INVALID' })
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

    expect($('#loan-total1')).toHaveText('$105,320.00');
    expect($('#loan-total2')).toHaveText('$57,926.53');
    expect($('#loan-total3')).toHaveText('$140,075.60');
  });


  it('suppors the loanAmount in string (money) format', function() {
    setFixtures(
        "<div id='widget1'><div id='loan-total1'></div><div>" +
        "<div id='widget2'><div id='loan-total2'></div><div>"
    );

    $('#widget1').loanCalculator({ loanAmount: '50,000', loanTotalSelector: '#loan-total1' });
    $('#widget2').loanCalculator({ loanAmount: '$133,100.25', loanTotalSelector: '#loan-total2' });

    expect($('#loan-total1')).toHaveText('$52,660.00');
    expect($('#loan-total2')).toHaveText('$140,181.18');
  });


  it('accepts css selectors for the results as options', function() {
    setFixtures(
      "<div id='widget'>" +
        "<p id='total-container'></p>" +
        "<p id='monthly-rate-container'></p>" +
        "<p id='selected-credit-score'></p>" +
      "</div>"
    );

    $('#widget').loanCalculator({
      loanAmount: '$120,000.00',
      loanDuration: '12 months',
      loanTotalSelector: '#total-container',
      monthlyRateSelector: '#monthly-rate-container'
    });

    expect($('#total-container')).toHaveText('$126,384.00');
    expect($('#monthly-rate-container')).toHaveText('$10,532.00');
  });


  it('updates results if called multiple times', function(){
    $('#widget').loanCalculator({ loanAmount: 50000 });
    $('#widget').loanCalculator({ loanAmount: 150000 });

    expect($('#loan-total')).toHaveText('$157,980.00');
    expect($('#monthly-rate')).toHaveText('$13,165.00');
  });


  it('is supports jquery fluent chainable syntax', function(){
    var widget = $('#widget')
                    .addClass('active')
                    .loanCalculator({ loanAmount: '50000' })
                    .attr('test', 'testing');

    expect($('#loan-total')).toHaveText('$52,660.00');
    expect(widget).toHaveClass('active');
    expect(widget).toHaveAttr('test');
  });


});
