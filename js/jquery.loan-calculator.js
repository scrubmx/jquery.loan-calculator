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

    // change the template selectors
    loanTotalSelector   : '#loan-total',
    monthlyRateSelector : '#monthly-rate',
    creditScoreSelector : '#credit-score',

    selectedAmount      : '#selected-amount',
    selectedDuration    : '#selected-duration',
    selectedScore       : '#selected-score'
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
     * Validates the data and shows the results.
     * @return {void}
     */
    init: function() {
      this.validate();
      this.render();
    },

    /**
     * Sanitize and validate the user input data.
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
     * Get the credit rate corresponding to the provided credit score.
     * @return {Number}
     */
    getCreditScoreRate: function() {
      return CREDIT_RATES[ this.settings.creditScore ];
    },

    /**
     * Calculates the total amount of interest.
     * @return {Number}
     */
    getInterestTotal: function() {
      return this.settings.loanAmount * (this.getCreditScoreRate()/100);
    },

    /**
     * Calculates the total cost of the loan.
     * @return {Number}
     */
    getLoanTotal: function() {
      return this.settings.loanAmount + this.getInterestTotal();
    },

    /**
     * Calculate the monthly rate for the provided loan duration.
     * @return {Number}
     */
    getMonthlyRate: function() {
      return this.getLoanTotal() / this.settings.loanDuration;
    },

    /**
     * Show the results in the DOM.
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
     * Convert numeric format to money format.
     * @param  {Number} numeric
     * @return {String}
     */
    toMoney: function(numeric) {
      return '$' + numeric.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    },

    /**
     * Convert from money format to numeric format.
     * @param  {[type]} value
     * @return {[type]}
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