jQuery(document).ready(function ($) {
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
    $("input[data-type='currency']").on({
        keyup: function () {
            formatCurrency($(this));
        }
        , blur: function () {
            formatCurrency($(this), "blur");
        }
    });
    /* 
    HELPER FUNCTIONS
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
    /* 
    UNLEASH THE SLIDERS
    */
    // Loan value slider
    loanamountslider = document.getElementById('loanamount');
    noUiSlider.create(loanamountslider, {
        start: parseInt(LoanProduct.defaultamount)
        , animate: true
        , pips: {
            mode: 'positions'
            , values: [0, 50, 100]
            , density: 10
            , stepped: true
            , format: wNumb({
                decimals: 0
                , thousand: ','
                , prefix: '£'
            })
        }
        , connect: [true, false]
        , step: parseInt(LoanProduct.step)
        , range: {
            'min': parseInt(LoanProduct.minamount)
            , 'max': parseInt(LoanProduct.maxamount)
        }
    });
    //Loan term slider
    loantermslider = document.getElementById('loanterm');
    noUiSlider.create(loantermslider, {
        start: parseInt(LoanProduct.defaultterm)
        , animate: true
        , connect: [true, false]
        , step: 1
        , pips: {
            mode: 'positions'
            , values: [0, 50, 100]
            , density: 10
            , format: wNumb({
                decimals: 0
                , thousand: ','
                , suffix: ' months'
            })
        }
        , range: {
            'min': parseInt(LoanProduct.minterm)
            , 'max': parseInt(LoanProduct.maxterm)
        }
    });
    // Set initial title description
    $('#product-name').text(LoanProduct.product);
    $('#product-description').text(LoanProduct.desc);
    /* 
    FIRE UP THE CALCULATOR
    */
    $calculator = $('#widget').loanCalculator({
        loanAmount: parseInt(LoanProduct.defaultamount)
        , loanDuration: parseInt(LoanProduct.defaultterm)
        , interestRate: parseFloat(LoanProduct.rate)
        , paymentFrequency: 'monthly'
    });
    /*
    UPDATE THE CALCULATOR
    */
    // When amount slider is updated
    loanamountslider.noUiSlider.on('update', function () {
        var LoanAmount = loanamountslider.noUiSlider.get();
        $calculator.loanCalculator('update', {
            loanAmount: LoanAmount
        });
        $('.selected-amount').text(formatMoney(LoanAmount));
    });
    // When amount slider is updated
    loantermslider.noUiSlider.on('update', function () {
        var Loanterm = loantermslider.noUiSlider.get();
        $calculator.loanCalculator('update', {
            loanDuration: Loanterm
        });
        $('.selected-term').text(monthstoYears(parseInt(Loanterm)));
    });
    // When the calculator changes, update the application URL
    $calculator.on('loan:update', function (e) {
        loanAmount = parseInt(loanamountslider.noUiSlider.get());
        loanTerm = parseInt(loantermslider.noUiSlider.get());
        applyurl = "https://www.cuonline.org.uk/v3/ApplyLoanV3-3.aspx?newmember=no&amount=" + loanAmount + "&months=" + loanTerm + "&skipcalc=true";
        $('#ApplyLink').attr("href", applyurl);
    });
    // When apply button is clicked, send info to datalayer
    $('#ApplyLink').on('click', function (e) {
        dataLayer.push({
            'loanAmount': parseInt(loanamountslider.noUiSlider.get())
            , 'loanTerm': parseInt(loantermslider.noUiSlider.get())
            , 'loanProduct': LoanProduct.product
        })
    });
    /*
    DYNAMICALLY CHANGE PARAMS USING ANCHOR LINK AND DATA ATTRIBS
    */
    $('[data-toggle="product"]').on('click', function (e) {
        var minTerm = parseInt($(this).attr('data-min-term'));
        var maxTerm = parseInt($(this).attr('data-max-term'));
        var minValue = parseInt($(this).attr('data-min-value'));
        var maxValue = parseInt($(this).attr('data-max-value'));
        var rangeStep = parseInt($(this).attr('data-step'));
        //var aprRate = $(this).attr('data-apr');
        var interestRate = $(this).attr('data-interest');
        var productName = $(this).attr('data-product');
        var productDesc = $(this).attr('data-description');
        //interestRate = convertAPR(aprRate);
        //Change Range attribs
        $('[data-toggle="product"]').not(this).removeClass('active');
        $(this).addClass('active');
        $('#saver').hide();
        $('#product-name').text(productName);
        $('#product-description').text(productDesc);
        if ($(window).width() < 576) {
            $('html, body').animate({
                scrollTop: $('#widget').offset().top - 25
            }, 500);
        };
        // If currently selected amount is greater than the max or less than the minumum for this product, move it back to the centre
        function getDefaultamount() {
            if (loanamountslider.noUiSlider.get() > maxValue || loanamountslider.noUiSlider.get() < minValue) {
                defaultvalue = (maxValue - minValue) / 2;
            }
            else {
                defaultvalue = loanamountslider.noUiSlider.get();
            }
            return defaultvalue
        }
        loanamountslider.noUiSlider.set(getDefaultamount);
        // Update the rest of the options
        loanamountslider.noUiSlider.updateOptions({
            range: {
                'min': minValue
                , 'max': maxValue
            }
            , step: rangeStep
        });
        loantermslider.noUiSlider.updateOptions({
            range: {
                'min': minTerm
                , 'max': maxTerm
            }
        });
        // Recalculate
        $calculator.loanCalculator('update', {
            interestRate: interestRate
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