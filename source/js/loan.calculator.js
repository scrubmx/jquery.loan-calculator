jQuery(document).ready(function ($) {
	// Only fire this up if it isn't a consolidation calculator
	if (ProductDefaults.product != 'CON') {
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
			start: ProductDefaults.amount,
			animate: true,
			pips: {
				mode: 'positions',
				values: [0, 100],
				density: 100,
				stepped: true,
				format: wNumb({
					decimals: 0,
					thousand: ',',
					prefix: '£'
				})
			},
			connect: [true, false],
			step: ProductDefaults.step,
			range: {
				'min': ProductDefaults.minamount,
				'max': ProductDefaults.maxamount
			}
		});
		//Set default values for loan terms
		loantermslider = document.getElementById('loanterm');
		variableMinTerm = variableTerm(ProductDefaults.minamount).min;
		variableMaxTerm = variableTerm(ProductDefaults.maxamount).max;
		noUiSlider.create(loantermslider, {
			start: ProductDefaults.term,
			animate: true,
			connect: [true, false],
			step: 1,
			pips: {
				mode: 'positions',
				values: [0, 100],
				density: 100,
				format: wNumb({
					decimals: 0,
					thousand: ',',
					suffix: ' months'
				})
			},
			range: {
				'min': variableMinTerm,
				'max': variableMaxTerm
			}
		});
		// Set default title description
		$('#product-name').text(ProductDefaults.displayname);
		$('#product-description').text(ProductDefaults.desc);
		/* 
		FIRE UP THE CALCULATOR
		*/
		$calculator = $('#widget').loanCalculator({
			loanAmount: ProductDefaults.amount,
			loanDuration: ProductDefaults.term,
			interestRate: ProductDefaults.rate,
			paymentFrequency: 'monthly'
		});
		/*
		UPDATE THE CALCULATOR
		*/
		// When amount slider is updated
		loanamountslider.noUiSlider.on('update', function () {
			CurrentAmount = loanamountslider.noUiSlider.get();
			CurrentRate = variableInterest(CurrentAmount);
			$calculator.loanCalculator('update', {
				loanAmount: CurrentAmount,
				interestRate: CurrentRate
			});
			$('.selected-amount').text(ConvertToMoney(CurrentAmount));
			loantermslider.noUiSlider.updateOptions({
				range: {
					'min': variableTerm(CurrentAmount).min,
					'max': variableTerm(CurrentAmount).max
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
			gtmProduct = ProductDefaults.product;
			gtmInterest = ConvertToNumber($('#interest-total').text());
			setURLS(gtmLoanAmount, gtmLoanLength, gtmProduct);
		});
		/*
		When a new product is selected, change values
		*/
		$('[data-toggle="product"]').on('click', function (e) {
			e.preventDefault();
			var ProductDefaults = {
				minValue: $(this).data('min-value'),
				maxValue: $(this).data('max-value'),
				step: $(this).data('step'),
				rate: $(this).data('interest'),
				displayname: $(this).data('displayname'),
				desc: $(this).data('description'),
				term: $(this).data('default-term'),
				amount: $(this).data('default-value')
			}
			//Change Range attribs
			$('#product-displayname').text(ProductDefaults.displayname);
			$('#product-description').text(ProductDefaults.desc);
			// Update the rest of the options
			loanamountslider.noUiSlider.updateOptions({
				range: {
					'min': ProductDefaults.minValue,
					'max': ProductDefaults.maxValue
				},
				step: ProductDefaults.step
			});
			loantermslider.noUiSlider.updateOptions({
				range: {
					'min': variableTerm(ProductDefaults.minValue).min,
					'max': variableTerm(ProductDefaults.maxValue).max
				}
			});
			loanamountslider.noUiSlider.set(ProductDefaults.amount);
			loantermslider.noUiSlider.set(ProductDefaults.term);
			// Recalculate
			$calculator.loanCalculator('update', {
				interestRate: ProductDefaults.rate
			});
		});
		/* 
		SPECIAL FOR THE SAVER LOAN
		*/
		if (ProductDefaults.product == 'SAV') {
			$('.slider').hide();
			$('.calculator-right').hide();
			$('#saver').show();
			$('#saver').change(function () {
				$('.slider').show();
				$('.calculator-right').show();
				var savedAmount = $('#saved-amount').val();
				var convertedAmount = ConvertToNumber(savedAmount);
				loanamountslider.noUiSlider.set(convertedAmount);
				loantermslider.noUiSlider.updateOptions({
					range: {
						'min': 0,
						'max': 120
					}
				});
				loanamountslider.noUiSlider.updateOptions({
					range: {
						'min': 0,
						'max': convertedAmount
					}
				});
			});
		};
	}
});

