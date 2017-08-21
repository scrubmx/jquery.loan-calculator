/*!
 * jQuery Loan Calculator 3.1.3
 *
 * Author: Jorge González <scrub.mx@gmail>
 * Released under the MIT license - https://opensource.org/licenses/MIT
 */
;(function ($, window, document, undefined) {

  "use strict";

  /**
   * Table of credit rates for every score.
   * @type {Object}
   */
  var CREDIT_RATES = {
    'A': 5.32,
    'B': 8.18,
    'C': 12.29,
    'D': 15.61,
    'E': 18.25,
    'F': 21.99,
    'G': 26.77
  };

  /**
   * Table of allowed payment frequencies.
   * @type {Object}
   */
  var PAYMENT_FREQUENCIES = {
    'weekly'   : 52,
    'biweekly' : 26,
    'monthly'  : 12
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
    loanAmount       : 50000,
    loanDuration     : 12,
    creditRates      : CREDIT_RATES,
    creditScore      : 'A',
    valueAddedTax    : 0,
    serviceFee       : 0,
    paymentFrequency : 'monthly',

    // inputs
    loanAmountSelector       : '#loan-amount',
    loanDurationSelector     : '#loan-duration',
    creditScoreSelector      : '#credit-score',
    paymentFrequencySelector : '#payment-frequency',

    // display selected values
    selectedAmount           : '#selected-amount',
    selectedDuration         : '#selected-duration',
    selectedScore            : '#selected-score',
    selectedPaymentFrequency : '#selected-payment-frequency',

    // display the results
    loanTotalSelector       : '#loan-total',
    paymentSelector         : '#payment',
    interestTotalSelector   : '#interest-total',
    serviceFeeSelector      : '#service-fee',
    taxTotalSelector        : '#tax-total',
    totalAnnualCostSelector : '#total-annual-cost',
    loanGrandTotalSelector  : '#grand-total'
  };

  /**
   * The actual plugin constructor
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
    init: function () {
      this.validate();
      this.render();
    },

    /**
     * Attach event listeners to the event handlers.
     * @return {void}
     */
    attachListeners: function () {
      var eventEmitters = [
        this.settings.loanAmountSelector,
        this.settings.loanDurationSelector,
        this.settings.creditScoreSelector,
        this.settings.paymentFrequencySelector
      ];

      $(eventEmitters.join()).on({
        change    : this.eventHandler.bind(this),
        mousemove : this.eventHandler.bind(this),
        touchmove : this.eventHandler.bind(this)
      });
    },

    /**
     * Handle events from the DOM.
     * @return {void}
     */
    eventHandler: function () {
      this.update({
        loanAmount       : this.$el.find(this.settings.loanAmountSelector).val(),
        loanDuration     : this.$el.find(this.settings.loanDurationSelector).val(),
        creditScore      : this.$el.find(this.settings.creditScoreSelector).val(),
        paymentFrequency : this.$el.find(this.settings.paymentFrequencySelector).val()
      });
    },

    /**
     * Sanitize and validate the user input data.
     * @throws Error
     * @return {void}
     */
    validate: function () {
      if (typeof this.settings.loanAmount === 'string') {
        this.settings.loanAmount = this._toNumeric(this.settings.loanAmount);
      }

      if (typeof this.settings.serviceFee === 'string') {
        this.settings.serviceFee = this._toNumeric(this.settings.serviceFee);
      }

      if (! $.isPlainObject(this.settings.creditRates)) {
        throw new Error('The value provided for [creditRates] is not valid.');
      }

      for (var creditRate in this.settings.creditRates) {
        if (typeof this.settings.creditRates[creditRate] === 'string') {
          this.settings.creditRates[creditRate] = this._toNumeric(this.settings.creditRates[creditRate])
        }

        if (! $.isNumeric(this.settings.creditRates[creditRate])) {
          throw new Error('The value provided for [creditRates] is not valid.')
        }

        if (this.settings.creditRates[creditRate] < 1) {
          this.settings.creditRates[creditRate] = this.settings.creditRates[creditRate] * 100;
        }
      }

      // Sanitize the input
      this.settings.loanAmount = parseFloat(this.settings.loanAmount);
      this.settings.loanDuration = parseFloat(this.settings.loanDuration);
      this.settings.serviceFee = parseFloat(this.settings.serviceFee);
      this.settings.creditScore = $.trim(this.settings.creditScore.toUpperCase());

      if (! PAYMENT_FREQUENCIES.hasOwnProperty(this.settings.paymentFrequency)) {
        throw new Error('The value provided for [paymentFrequency] is not valid.');
      }

      if (! this.settings.creditRates.hasOwnProperty(this.settings.creditScore)) {
        throw new Error('The value provided for [creditScore] is not valid.');
      }

      if (this.settings.loanAmount < MINIMUM_LOAN) {
        throw new Error('The value provided for [loanAmount] must me at least 1000.');
      }

      if (this.settings.loanDuration < MINIMUM_DURATION) {
        throw new Error('The value provided for [loanDuration] must me at least 1.');
      }

      if (! $.isNumeric(this.settings.serviceFee)) {
        throw new Error('The value provided for [serviceFee] is not valid.');
      }
    },

    /**
     * Show the results in the DOM.
     * @return {void}
     */
    render: function () {
      this._displaySelectedValues();
      this._displayResults();
    },

    /**
     * Show the selected values in the DOM.
     * @return {void}
     */
    _displaySelectedValues: function () {
      // Display the selected loan amount
      this.$el.find(this.settings.selectedAmount).html(
        this._toMoney(this.settings.loanAmount)
      );

      // Display the selected loan duration
      this.$el.find(this.settings.selectedDuration).html(
        this.settings.loanDuration
      );

      // Display the selected credit score
      this.$el.find(this.settings.selectedScore).html(
        this.settings.creditScore
      );

      // Display the selected payment frequency
      this.$el.find(this.settings.selectedPaymentFrequency).html(
        this.settings.paymentFrequency
      );
    },

    /**
     * Display the results for the current values.
     * @return {void}
     */
    _displayResults: function () {
      // Display the loan total
      this.$el.find(this.settings.loanTotalSelector).html(
        this._toMoney(this._loanTotal())
      );

      // Display the loan periodic payment
      this.$el.find(this.settings.paymentSelector).html(
        this._toMoney(this._PMT())
      );

      // Display the interest total amount
      this.$el.find(this.settings.interestTotalSelector).html(
        this._toMoney(this._interestTotal())
      );

      // Display the tax total amount
      this.$el.find(this.settings.taxTotalSelector).html(
        this._toMoney(this._taxTotal())
      );

      // Display the annual total cost
      this.$el.find(this.settings.totalAnnualCostSelector).html(
        this._toPercentage(this._CAT())
      );

      // Display the service fee if any
      this.$el.find(this.settings.serviceFeeSelector).html(
        this._toMoney(this._serviceFeeWithVAT())
      );

      this.$el.find(this.settings.loanGrandTotalSelector).html(
        this._toMoney(this._grandTotal())
      );
    },

    /**
     * Run the init method again with the provided options.
     * @param {Object} args
     */
    update: function (args) {
      this.settings = $.extend({}, this._defaults, this.settings, args);
      this.init();
      this.$el.trigger('loan:update');
    },

    /**
     * Generate the results as an array of objects,
     * each object contains the values for each period.
     * @return {Array}
     */
    _results: function () {
      var balance          = this.settings.loanAmount;
      var initial          = this.settings.loanAmount;
      var interestRate     = this._interestRate();
      var VAT              = this._valueAddedTax();
      var payment          = this._PMT();
      var numberOfPayments = this._numberOfPayments();
      var results          = [];

      // We loop over the number of payments and each time
      // we extract the information to build the period
      // that will be appended to the results array.
      for (var paymentNumber = 0; paymentNumber < numberOfPayments; paymentNumber++) {
        var interest  = balance * interestRate;
        var taxesPaid = balance * interestRate * VAT;
        var principal = payment - interest - taxesPaid;

        // update initial balance for next iteration
        initial = balance;

        // update final balance for the next iteration.
        balance = balance - principal;

        results.push({
          initial   : initial,
          principal : principal,
          interest  : interest,
          tax       : taxesPaid,
          payment   : payment,
          balance   : balance
        })
      };

      return results;
    },

    /**
     * Generate the amortization schedule.
     * @return {Array}
     */
    schedule: function () {
      return $.map(this._results(), function (value) {
        return {
          initial   : this._toMoney(value.initial),
          principal : this._toMoney(value.principal),
          interest  : this._toMoney(value.interest),
          tax       : this._toMoney(value.tax),
          payment   : this._toMoney(value.payment),
          balance   : this._toMoney(value.balance)
        }
      }.bind(this));
    },

    /**
     * Return the credit rates being used.
     * @return {Object}
     */
    creditRates: function () {
      return this.settings.creditRates;
    },

    /**
     * Get the credit rate corresponding to the current credit score.
     * @return {Number}
     */
    _annualInterestRate: function () {
      if (this.settings.hasOwnProperty('interestRate')) {
        if (this.settings.interestRate <= 1) {
          return this.settings.interestRate;
        }

        return this._toNumeric(this.settings.interestRate) / 100;
      }

      return this.settings.creditRates[ this.settings.creditScore ] / 100;
    },

    /**
     * Get the periodic interest rate.
     * @returns {Number}
     */
    _interestRate: function () {
      return this._annualInterestRate() / this._paymentFrequency();
    },


    /**
     * Returns the periodic payment frequency
     * @returns {Number}
     */
    _paymentFrequency: function () {
      return PAYMENT_FREQUENCIES[this.settings.paymentFrequency];
    },

    /**
     * Returns number of payments for the loan.
     * @returns {Number}
     */
    _numberOfPayments: function () {
      var durationInYears = this._toNumeric(this.settings.loanDuration) / 12;

      return Math.floor(durationInYears * PAYMENT_FREQUENCIES[this.settings.paymentFrequency]);
    },

    /**
     * Calculates the total cost of the loan.
     * @return {Number}
     */
    _loanTotal: function () {
      return this._PMT() * this._numberOfPayments();
    },

    /**
     * Calculate the monthly amortized loan payments.
     * @see https://en.wikipedia.org/wiki/Compound_interest#Monthly_amortized_loan_or_mortgage_payments
     * @return {Number}
     */
    _PMT: function () {
      var i = this._interestRate();
      var L = this.settings.loanAmount;
      var n = this._numberOfPayments();

      if (this.settings.valueAddedTax !== 0) {
        i = (1 + this._valueAddedTax()) * i; // interest rate with tax
      }

      return (L * i) / (1 - Math.pow(1 + i, -n));
    },

    /**
     * Calculate the total interest for the loan.
     * @returns {Number}
     */
    _interestTotal: function () {
      var total = 0;
      $.each(this._results(), function (index, value) {
        total += value.interest;
      });
      return total;
    },

    /**
     * Calculate the value added tax total for the loan.
     * @returns {Number}
     */
    _taxTotal: function () {
      var total = 0;
      $.each(this._results(), function (index, value) {
        total += value.tax;
      });
      return total;
    },

    /**
     * Return the loan fees and commissions total.
     * @return {Number}
     */
    _serviceFee: function () {
      var serviceFee = this.settings.serviceFee;

      // if the service fee is greater than 1 then the
      // value must be converted to decimals first.
      if (serviceFee > 1) {
        serviceFee = serviceFee / 100;
      }

      return this.settings.loanAmount * serviceFee;
    },

    /**
     * Return the loan fees and commissions total with VAT included.
     * @return {Number}
     */
    _serviceFeeWithVAT: function () {
      return this._serviceFee() * (this._valueAddedTax() + 1)
    },

    /**
     * Calculates the total cost of the loan including the service fee.
     * @return {Number}
     */
    _grandTotal: function () {
      return this._loanTotal() + this. _serviceFeeWithVAT();
    },

    /**
     * Return the total annual cost (CAT)
     * @see http://www.banxico.org.mx/CAT
     * @return {Number}
     */
    _CAT: function () {
      var IRR = this._IRR(this._cashFlow());
      var periods = this._paymentFrequency();

      return Math.pow(1 + IRR, periods) - 1;
    },

    /**
     * Returns an array with a series of cash flows for the current loan.
     * @return {Array}
     */
    _cashFlow: function () {
      var results = this._results();
      var cashFlow = [this._serviceFee() - this.settings.loanAmount];

      $.each(results, function (index, period) {
        cashFlow.push(period.payment - period.tax);
      }.bind(this));

      return cashFlow;
    },

    /**
     * Returns the internal rate of return for a series of cash flows represented by the numbers in values.
     * @param  {Array} values
     * @param  {Number} guess
     * @return {Number}
     */
    _IRR: function (values, guess) {
      guess = guess || 0;

      // Calculates the resulting amount
      var irrResult = function (values, dates, rate) {
        var result = values[0];

        for (var i = 1; i < values.length; i++) {
          result += values[i] / Math.pow(rate+1, (dates[i] - dates[0]) / 365);
        }

        return result;
      };

      // Calculates the first derivation
      var irrResultDerivative = function (values, dates, rate) {
        var result = 0;

        for (var i = 1; i < values.length; i++) {
          var frac = (dates[i] - dates[0]) / 365;
          result -= frac * values[i] / Math.pow(rate+1, frac+1);
        }

        return result;
      };

      // Initialize dates and check that values contains at
      // least one positive value and one negative value
      var dates    = [];
      var positive = false;
      var negative = false;

      for (var i = 0; i < values.length; i++) {
        dates[i] = (i === 0) ? 0 : dates[i - 1] + 365;
        if (values[i] > 0) positive = true;
        if (values[i] < 0) negative = true;
      }

      if (! positive || ! negative) {
        throw new Error(
          'Error the values does not contain at least one positive value and one negative value'
        );
      }

      // Initialize guess and resultRate
      guess = (guess === undefined) ? 0.1 : guess;
      var resultRate = guess;

      // Set maximum epsilon for end of iteration
      var epsMax = 1e-10;

      // Implement Newton's method
      var newRate, epsRate, resultValue;
      var contLoop = true;

      do {
        resultValue = irrResult(values, dates, resultRate);
        newRate     = resultRate - resultValue / irrResultDerivative(values, dates, resultRate);
        epsRate     = Math.abs(newRate - resultRate);
        resultRate  = newRate;
        contLoop    = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
      } while (contLoop);

      // Return internal rate of return
      return resultRate;
    },

    /**
     * Return the value added tax in decimals.
     * @return {Number}
     */
    _valueAddedTax: function () {
      var tax = this._toNumeric(this.settings.valueAddedTax || 0);

      // if tax is greater than 1 means the value
      // must be converted to decimals first.
      return (tax > 1) ? tax/100 : tax;
    },

    /**
     * Convert numeric format to money format.
     * @param  {Number} numeric
     * @return {String}
     */
    _toMoney: function (numeric) {
      if (typeof numeric == 'string') {
        numeric = parseFloat(numeric);
      }

      return '$' + numeric.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    },

    /**
     * Convert from money format to numeric format.
     * @param  {String} value
     * @return {Number}
     */
    _toNumeric: function (value) {
      return parseFloat(
        value.toString().replace(/[^0-9\.]+/g, '')
      );
    },

    /**
     * To convert the provided value to percent format.
     * @param {Number} numeric
     * @returns {String}
     */
    _toPercentage: function (numeric) {
      return (numeric * 100).toFixed(2) + '%';
    }

  });

  /**
   * Wrapper around the constructor to prevent multiple instantiations.
   */
  $.fn.loanCalculator = function (options, args) {
    if (options === 'schedule') {
      return this.data('plugin_loanCalculator').schedule();
    }

    if (options === 'rates') {
      return this.data('plugin_loanCalculator').creditRates();
    }

    return this.each(function () {
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
