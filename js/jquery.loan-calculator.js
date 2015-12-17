;(function($, window, document, undefined) {

	"use strict";

	/**
	 * [CREDIT_RATES description]
	 * @type {Object}
	 */
	var CREDIT_RATES = {
		'A': 5.32,  'A1': 5.32,  'A2': 6.24,  'A3': 6.89,  'A4': 7.26,  'A5': 7.89,
		'B': 8.18,  'B1': 8.18,  'B2': 9.17,  'B3': 9.99,  'B4': 10.99, 'B5': 11.53,
		'C': 12.29, 'C1': 12.29, 'C2': 12.69, 'C3': 13.33, 'C4': 13.99, 'C5': 14.65,
		'D': 15.61, 'D1': 15.61, 'D2': 16.55, 'D3': 16.99, 'D4': 17.57, 'D5': 17.86,
		'E': 18.25, 'E1': 18.25, 'E2': 18.55, 'E3': 19.19, 'E4': 19.99, 'E5': 20.99,
		'F': 21.99, 'F1': 21.99, 'F2': 22.99, 'F3': 23.99, 'F4': 24.99, 'F5': 25.78,
		'G': 26.77, 'G1': 26.77, 'G2': 27.31, 'G3': 27.88, 'G4': 28.49, 'G5': 28.99
	};

	/**
	 * [INVESTMENT description]
	 * @type {Number}
	 */
	var MINIMUM_INVESTMENT = 50000;

	/**
	 * [DURATION description]
	 * @type {Number}
	 */
	var MINIMUM_DURATION = 12;

	/**
	 * Default options for the plugin.
	 * @type {Object}
	 */
	var defaults = { 
		// default values for a loan
		loanAmount: 50000,
		loanDuration: 12,
		creditScore: 'A',

		// change the template selectors
		loanTotalSelector   : '#loan-total',
		monthlyRateSelector : '#monthly-rate',
		creditScoreSelector : '#credit-score',       // missing test

		selectedAmount      : '#selected-amount',    // missing test
		selectedDuration    : '#selected-duration',  // missing test
		selectedScore       : '#selected-score'      // missing test
	};

	/**
	 * Plugin constructor
	 * @param {Object} element
	 * @param {Object} options
	 */
	function Plugin(element, options) {
		this.$el = $(element);
		this._defaults = defaults;
		this.settings = $.extend({}, defaults, options);
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {

		/**
		 * [init description]
		 * @return {void}
		 */
		init: function() {
			this.validate();
			this.render();
		},

		/**
		 * [validate description]
		 * @return {void}
		 */
		validate: function() {
			if (typeof this.settings.loanAmount === 'string') {
				this.settings.loanAmount = this.toNumeric(this.settings.loanAmount);
			}

			// Sanitize the input
			this.settings.loanAmount = parseFloat(this.settings.loanAmount);
			this.settings.loanDuration = parseFloat(this.settings.loanDuration);
			this.settings.creditScore = $.trim(this.settings.creditScore.toUpperCase());

			// Validate that credit rate is a 'known' value
			if (! CREDIT_RATES.hasOwnProperty(this.settings.creditScore)) {
				throw new Error('The value provided for [creditScore] is not a valid.');
			}

			if (this.settings.loanAmount < MINIMUM_INVESTMENT) {
				throw new Error('The value provided for [loanAmount] must me at least 10000.');
			}

			if (this.settings.loanDuration < MINIMUM_DURATION) {
				throw new Error('The value provided for [loanDuration] must me at least 6.');
			}
		},

		/**
		 * [getCreditScoreRate description]
		 * @return {Number} [description]
		 */
		getCreditScoreRate: function() {
			return CREDIT_RATES[ this.settings.creditScore ];
		},

		/**
		 * [getInterestTotal description]
		 * @return {Number} [description]
		 */
		getInterestTotal: function() {
			return this.settings.loanAmount * (this.getCreditScoreRate()/100);
		},

		/**
		 * [getLoanTotal description]
		 * @return {Number} [description]
		 */
		getLoanTotal: function() {
			return this.settings.loanAmount + this.getInterestTotal();
		},

		/**
		 * [getMonthlyRate description]
		 * @return {Number} [description]
		 */
		getMonthlyRate: function() {
			return this.getLoanTotal() / this.settings.loanDuration;
		},

		/**
		 * [render description]
		 * @return {void}
		 */
		render: function() {
			this.$el.find(this.settings.loanTotalSelector).html(
				this.toMoney(this.getLoanTotal())
			);

			this.$el.find(this.settings.monthlyRateSelector).html(
				this.toMoney(this.getMonthlyRate())
			);

			this.$el.find(this.settings.selectedAmount).html(
				this.toMoney(this.settings.loanAmount)
			);

			this.$el.find(this.settings.selectedDuration).html(
				this.settings.loanDuration
			);

			this.$el.find(this.settings.selectedScore).html(
				this.settings.creditScore
			);
		},

		/**
		 * [toMoney description]
		 * @param  {Number} numeric [description]
		 * @return {String}         [description]
		 */
		toMoney: function(numeric) {
			return '$' + numeric.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		},

		/**
		 * [toNumeric description]
		 * @param  {[type]} value [description]
		 * @return {[type]}       [description]
		 */
		toNumeric: function(value) {
			return value.toString().replace(/[^0-9\.]+/g, '');
		}

	});

	// wrapper around the constructor to prevent against multiple instantiations
	$.fn.loanCalculator = function(options) {
		return this.each(function() {
			new Plugin(this, options);
		});
	};

})(jQuery, window, document);