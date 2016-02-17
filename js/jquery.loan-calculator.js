;(function($, window, document, undefined) {

  "use strict";

  /**
   * Table of the credit rates for every calification.
   * @type {Object}
   */
  var CREDIT_RATES = {
    'A': 12.00, 'A1': 12.00, 'A2': 12.62, 'A3': 13.24, 'A4': 13.86, 'A5': 14.48,
    'B': 15.10, 'B1': 15.10, 'B2': 15.72, 'B3': 16.34, 'B4': 16.97, 'B5': 17.59,
    'C': 18.21, 'C1': 18.21, 'C2': 18.83, 'C3': 19.45, 'C4': 20.07, 'C5': 20.69,
    'D': 21.31, 'D1': 21.31, 'D2': 21.93, 'D3': 22.55, 'D4': 23.17, 'D5': 23.79,
    'E': 24.41, 'E1': 24.41, 'E2': 25.03, 'E3': 25.66, 'E4': 26.28, 'E5': 26.90,
    'F': 27.52, 'F1': 27.52, 'F2': 28.14, 'F3': 28.76, 'F4': 29.38, 'F5': 30.00
  };

  /**
   * The minimum allowed for a loan.
   * @type {Number}
   */
  var MINIMUM_LOAN = 50000;

  /**
   * The minimum duration in months.
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

    // inputs
    loanAmountSelector   : '#loan-amount',
    loanDurationSelector : '#loan-duration',
    creditScoreSelector  : '#credit-score',

    // display selected values
    selectedAmount       : '#selected-amount',
    selectedDuration     : '#selected-duration',
    selectedScore        : '#selected-score',

    // results
    loanTotalSelector    : '#loan-total',
    monthlyRateSelector  : '#monthly-rate'
  };

  /**
   * Plugin constructor
   * @param {Object} element
   * @param {Object} options
   */
  function Plugin(element, options) {
    this.$el       = $(element);
    this._name     = 'loanCalculator';
    this._defaults = defaults;
    this.settings  = $.extend({}, defaults, options);
    this.attachListeners();
    this.init();
  }

    // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {

    /**
     * Validates the data and shows the results.
     * @return {void}
     */
    init: function() {
      this.validate();
      this.render();
    },

    /**
     * Attach event listeners to the event handlers.
     * @return {void}
     */
    attachListeners: function() {
      var eventEmitters = [
        this.settings.loanAmountSelector,
        this.settings.loanDurationSelector,
        this.settings.creditScoreSelector
      ];

      $(eventEmitters.join())
        .mousemove(this.eventHandler.bind(this))
        .change(this.eventHandler.bind(this));
    },

    /**
     * Handle events from the DOM.
     * @return {void}
     */
    eventHandler: function() {
      this.update({
        loanAmount   : this.$el.find(this.settings.loanAmountSelector).val(),
        loanDuration : this.$el.find(this.settings.loanDurationSelector).val(),
        creditScore  : this.$el.find(this.settings.creditScoreSelector).val()
      });
    },

    /**
     * Sanitize and validate the user input data.
     * @throws Error
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

      if (this.settings.loanAmount < MINIMUM_LOAN) {
        throw new Error('The value provided for [loanAmount] must me at least 10000.');
      }

      if (this.settings.loanDuration < MINIMUM_DURATION) {
        throw new Error('The value provided for [loanDuration] must me at least 6.');
      }
    },

    /**
     * Show the results in the DOM.
     * @return {void}
     */
    render: function() {
      this.$el.find(this.settings.loanTotalSelector).html(
        this.toMoney(this._loanTotal())
      );

      this.$el.find(this.settings.monthlyRateSelector).html(
        this.toMoney(this._monthlyRate())
      );

      this._displaySelectedValues();
    },

    /**
     * Show the selected values in the DOM.
     * @return {void}
     */
    _displaySelectedValues: function() {
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
     * Run the init method again with the provided options.
     * @param  {Object} args
     */
    update: function(args) {
      this.settings = $.extend({}, this._defaults, args);
      this.init();
    },

    /**
     * Get the credit rate corresponding to the current credit score.
     * @return {Number}
     */
    _interestRate: function() {
      return CREDIT_RATES[ this.settings.creditScore ] / 100;
    },

    /**
     * Get the monhtly interest rate for the current credit score.
     * @return {Number}
     */
    _monthlyInterestRate: function() {
      return this._interestRate() / 12;
    },

    /**
     * Calculates the total cost of the loan.
     * @return {Number}
     */
    _loanTotal: function() {
      return this._monthlyRate() * this.settings.loanDuration;
    },

    /**
     * Calculate the monthly amortized loan payments.
     * @see https://en.wikipedia.org/wiki/Compound_interest#Monthly_amortized_loan_or_mortgage_payments
     *
     * @return {Number}
     */
    _monthlyRate: function() {
      var i = this._monthlyInterestRate(); // interest rate
      var L = this.settings.loanAmount;    // amount borrowed
      var n = this.settings.loanDuration;  // number of payments

      return (L * i) / (1 - Math.pow(1 + i, -n));
    },

    /**
     * Convert numeric format to money format.
     * @param  {Number} numeric
     * @return {String}
     */
    toMoney: function(numeric) {
      return '$' + numeric.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    },

    /**
     * Convert from money format to numeric format.
     * @param  {String} value
     * @return {Number}
     */
    toNumeric: function(value) {
      return value.toString().replace(/[^0-9\.]+/g, '');
    }

  });

  $.fn.loanCalculator = function(options, args) {
    return this.each(function() {
      var instance = $.data(this, 'plugin_loanCalculator');
      if (! instance) {
        $.data(this, 'plugin_loanCalculator', new Plugin(this, options));
      }
      else if (options === 'update') {
        return instance.update(args);
      }
    });
  };

})(jQuery, window, document);
