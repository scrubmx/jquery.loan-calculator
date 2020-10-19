jQuery(document).ready(function ($) {
    // Only fire this up if it isn't a consolidation calculator
    if (ProductDefaults.consolidation == 0) {
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
                , density: 100
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
                , density: 100
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
            $('.selected-amount').text(ConvertToMoney(CurrentAmount));
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
            gtmLoanAmount = parseInt(loanamountslider.noUiSlider.get());
            gtmLoanLength = parseInt(loantermslider.noUiSlider.get());
            gtmProduct = 'Personal Loan';
            
            setURLS(gtmLoanAmount, gtmLoanLength);
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
                var convertedAmount = ConvertToNumber(savedAmount);
                loanamountslider.noUiSlider.updateOptions({
                    range: {
                        'min': 0
                        , 'max': convertedAmount
                    }
                });
            });
        });
    }
});