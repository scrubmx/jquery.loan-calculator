;(function($, window, document, undefined) {

  "use strict";

  /**
   * Table of the credit rates for every calification.
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
   * The minimum allowed for a loan.
   * @type {Number}
   */
  var MINIMUM_LOAN = 1000;

  /**
   * The minimum duration in months.
   * @type {Number}
   */
  var MINIMUM_DURATION = 1;

  /**
   * Default options for the plugin.
   * @type {Object}
   */
  var defaults = {
    // default values for a loan
    loanAmount    : 50000,
    loanDuration  : 12,
    creditScore   : 'A',

    // inputs
    loanAmountSelector   : '#loan-amount',
    loanDurationSelector : '#loan-duration',
    creditScoreSelector  : '#credit-score',

    // display selected values
    selectedAmount       : '#selected-amount',
    selectedDuration     : '#selected-duration',
    selectedScore        : '#selected-score',

    // display the results
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
        throw new Error('The value provided for [loanAmount] must me at least 1000.');
      }

      if (this.settings.loanDuration < MINIMUM_DURATION) {
        throw new Error('The value provided for [loanDuration] must me at least 1.');
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
      this.settings = $.extend({}, this._defaults, this.settings, args);
      this.init();
    },

    /**
     * Get the credit rate corresponding to the current credit score.
     * @return {Number}
     */
    _interestRate: function() {
      if (this.settings.hasOwnProperty('interestRate')) {
        return this.toNumeric(this.settings.interestRate) / 100;
      }

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
