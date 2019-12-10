jQuery(document).ready(function ($) {
    //Move modal in DOM and set up tabs and popovers
    $('#currentMember').appendTo("body")
    $('[data-toggle="popover"]').popover();
    $('#option-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        $('#option-tabs a').not(this).removeClass('active');
    });
    $('#info-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        $('#info-tabs a').not(this).removeClass('active');
    });
    $('[data-toggle="product"]').on('click', function (e) {
        $('[data-toggle="product"]').not(this).removeClass('active');
        $(this).addClass('active');
        $('#saver').hide();
        if ($(window).width() < 576) {
            $('html, body').animate({
                scrollTop: $('#widget').offset().top - 25
            }, 500);
        };
    });
    $("input[data-type='currency']").on({
        keyup: function () {
            formatCurrency($(this));
        }
        , blur: function () {
            formatCurrency($(this), "blur");
        }
    });
    /* 
    HELPER FUNCTIONS.
    */
    //Convert months into year
    function monthstoYears(value) {
        function getPlural(number, word) {
            return number === 1 && word.one || word.other;
        }
        var months = {
                one: 'month'
                , other: 'months'
            }
            , years = {
                one: 'year'
                , other: 'years'
            }
            , m = value % 12
            , y = Math.floor(value / 12)
            , result = [];
        y && result.push(y + ' ' + getPlural(y, years));
        m && result.push(m + ' ' + getPlural(m, months));
        return result.join(' and ');
    }
    // Format money correctly
    function formatMoney(value) {
        var moneyFormat = wNumb({
            mark: '.'
            , thousand: ','
            , prefix: '£'
        });
        var moneyValue = parseInt(value);
        return moneyFormat.to(moneyValue);
    }
    // Convert APR to monthly interest
    function convertAPR(value) {
        return (Math.pow((1 + (Math.pow(((value * 1 / 100) + 1), (1 / 12)) - 1) / 100), 12) - 1) * 100 * 100
    }
    // Change interest rates based on amount
    var SaverLoan = $('#saver-loan');
    var BoosterLoan = $('#booster-loan');
    var CUOKLoan = $('#cuok');
    var Salary = $('#salary');
    var Personal = $('#personal-loan');

    function variableInterest(value) {
        var InterestRate = ProductDefaults.rate;
        switch (true) {
        case (SaverLoan.hasClass('active')):
            InterestRate = 4.41;
            break;
        case (BoosterLoan.hasClass('active')):
            InterestRate = 36;
            break;
        case (CUOKLoan.hasClass('active')):
            InterestRate = 36;
            break;
        case (value < 500 && !Personal.hasClass('active') && !SaverLoan.hasClass('active') && !Salary.hasClass('active')):
            InterestRate = 36;
            break;
        case (value < 5000):
            InterestRate = 12.89;
            break;
        case (value < 7500):
            InterestRate = 6.69;
            break;
        case (value < 15001):
            InterestRate = 5.75;
            break;
        case (value < 25001):
            InterestRate = 4.75;
            break;
        }
        return InterestRate;
    };
    // Change time period based on amount
    function variableTerm(value) {
        switch (true) {
        case (SaverLoan.hasClass('active')):
            MaxTerm = 120;
            MinTerm = 1;
            break;
        case (CUOKLoan.hasClass('active')):
            MaxTerm = 3;
            MinTerm = 1;
            break;
        case (BoosterLoan.hasClass('active')):
            MaxTerm = 24;
            MinTerm = 1;
            break;
        case (value < 500 && !Personal.hasClass('active') && !SaverLoan.hasClass('active') && !Salary.hasClass('active')):
            MaxTerm = 3;
            MinTerm = 1;
            break;
        case (value < 3001):
            MaxTerm = 36;
            MinTerm = 1;
            break;
        case (value < 15000):
            MaxTerm = 60;
            MinTerm = 1;
            break;
        case (value < 25001):
            MaxTerm = 84;
            MinTerm = 12;
            break;
        }
        var Term = {
            min: MinTerm
            , max: MaxTerm
        }
        return Term;
    }
    /* 
    UNLEASH THE SLIDERS
    */
    // Loan value slider
    loanamountslider = document.getElementById('loanamount');
    noUiSlider.create(loanamountslider, {
        start: ProductDefaults.amount
        , animate: true
        , pips: {
            mode: 'positions'
            , values: [0, 100]
            , density: 10
            , stepped: true
            , format: wNumb({
                decimals: 0
                , thousand: ','
                , prefix: '£'
            })
        }
        , connect: [true, false]
        , step: ProductDefaults.step
        , range: {
            'min': ProductDefaults.minamount
            , 'max': ProductDefaults.maxamount
        }
    });
    //Set default values for loan term
    loantermslider = document.getElementById('loanterm');
    variableMinTerm = variableTerm(ProductDefaults.minamount).min;
    variableMaxTerm = variableTerm(ProductDefaults.maxamount).max;
    noUiSlider.create(loantermslider, {
        start: ProductDefaults.term
        , animate: true
        , connect: [true, false]
        , step: 1
        , pips: {
            mode: 'positions'
            , values: [0, 100]
            , density: 10
            , format: wNumb({
                decimals: 0
                , thousand: ','
                , suffix: ' months'
            })
        }
        , range: {
            'min': variableMinTerm
            , 'max': variableMaxTerm
        }
    });
    // Set default title description
    $('#product-name').text(ProductDefaults.product);
    $('#product-description').text(ProductDefaults.desc);
    /* 
    FIRE UP THE CALCULATOR
    */
    $calculator = $('#widget').loanCalculator({
        loanAmount: ProductDefaults.amount
        , loanDuration: ProductDefaults.term
        , interestRate: ProductDefaults.rate
        , paymentFrequency: 'monthly'
    });
    /*
    UPDATE THE CALCULATOR
    */
    // When amount slider is updated
    loanamountslider.noUiSlider.on('update', function () {
        CurrentAmount = loanamountslider.noUiSlider.get();
        CurrentRate = variableInterest(CurrentAmount);
        $calculator.loanCalculator('update', {
            loanAmount: CurrentAmount
            , interestRate: CurrentRate
        });
        $('.selected-amount').text(formatMoney(CurrentAmount));
        loantermslider.noUiSlider.updateOptions({
            range: {
                'min': variableTerm(CurrentAmount).min
                , 'max': variableTerm(CurrentAmount).max
            }
        });
    });
    // When term slider is updated
    loantermslider.noUiSlider.on('update', function () {
        var CurrentTerm = loantermslider.noUiSlider.get();
        $calculator.loanCalculator('update', {
            loanDuration: CurrentTerm
        });
        $('.selected-term').text(monthstoYears(parseInt(CurrentTerm)));
    });
    // When the calculator changes, update the application URL
    $calculator.on('loan:update', function (e) {
        var loanAmount = parseInt(loanamountslider.noUiSlider.get());
        var loanTerm = parseInt(loantermslider.noUiSlider.get());
        if (CUOKLoan.hasClass('active')) {
            applyurlMember = "https://www.cuonline.org.uk/PDL2/Default.aspx?CU=LMCU&amount=" + loanAmount + "&months=" + loanTerm + "&FP=1";
            applyurlGuest = "https://www.cuonline.org.uk/PDL2/Default.aspx?CU=LMCU&amount=" + loanAmount + "&months=" + loanTerm + "&FP=1";
        }
        else {
            applyurlMember = "https://www.cuonline.org.uk/v3/ApplyLoanV3-3.aspx?newmember=no&amount=" + loanAmount + "&months=" + loanTerm + "&skipcalc=true";
            applyurlGuest = "https://www.cuonline.org.uk/v3/ApplyLoanV3-2.aspx?newmember=yes&amount=" + loanAmount + "&months=" + loanTerm + "&skipcalc=true";
        };
        $('#GuestApplyLink').attr("href", applyurlGuest);
        $('#MemberApplyLink').attr("href", applyurlMember);
    });
    /*
    When a new product is selected, change values
    */
    $('[data-toggle="product"]').on('click', function (e) {
        var SelectedProduct = {
                minValue: $(this).data('min-value')
                , maxValue: $(this).data('max-value')
                , step: $(this).data('step')
                , rate: $(this).data('interest')
                , name: $(this).data('product')
                , desc: $(this).data('description')
                , term: $(this).data('default-term')
                , amount: $(this).data('default-value')
            }
            //Change Range attribs
        $('#product-name').text(SelectedProduct.name);
        $('#product-description').text(SelectedProduct.desc);
        // Update the rest of the options
        loanamountslider.noUiSlider.updateOptions({
            range: {
                'min': SelectedProduct.minValue
                , 'max': SelectedProduct.maxValue
            }
            , step: SelectedProduct.step
        });
        loantermslider.noUiSlider.updateOptions({
            range: {
                'min': variableTerm(SelectedProduct.minValue).min
                , 'max': variableTerm(SelectedProduct.maxValue).max
            }
        });
        loanamountslider.noUiSlider.set(SelectedProduct.amount);
        loantermslider.noUiSlider.set(SelectedProduct.term);
        // Recalculate
        $calculator.loanCalculator('update', {
            interestRate: SelectedProduct.rate
        });
    });
    /* 
    SPECIAL FOR THE SAVER LOAN
    */
    $('#saver-loan').on('click', function (e) {
        $('#saver').show();
        $('#saver').change(function () {
            var savedAmount = $('#saved-amount').val();
            var convertedAmount = parseFloat(Number(savedAmount.replace(/[^0-9\.]+/g, "")));
            loanamountslider.noUiSlider.updateOptions({
                range: {
                    'min': 0
                    , 'max': convertedAmount
                }
            });
        });
    });
});