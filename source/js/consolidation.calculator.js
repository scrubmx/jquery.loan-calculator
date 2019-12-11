/* Our nifty NPER function */
function NPER(rate, payment, present, future, type) {
  // Initialize type
  var type = (typeof type === 'undefined') ? 0 : type;

  // Initialize future value
  var future = (typeof future === 'undefined') ? 0 : future;

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);

  // Return number of periods
  var num = payment * (1 + rate * type) - future * rate;
  var den = (present * rate + payment * (1 + rate * type));
  return Math.log(num / den) / Math.log(1 + rate);
}

/* Main jobbie */
jQuery(document).ready(function ($) {
    //Sum up all inputs with same class
    function calculateSum(selector) {
        var sum = 0;
        $(selector).each(function () {
            if (this.value.length != 0) {
                var currency = this.value
                var rawNumber = Number(currency.replace(/[^0-9.-]+/g,""));
                sum += rawNumber;
            }
        });
        return sum;
        
    }
    // Repeater fields
    $(document).on('click', '.btn-add', function (e) {
        e.preventDefault();
        var controlForm = $('#repeater-rows')
            , currentEntry = $(this).parents('.repeat-row:first')
            , newEntry = $(currentEntry.clone()).appendTo(controlForm).fadeIn('slow').css("display", "flex");
        newEntry.find('input').val('');
        controlForm.find('.repeat-row:not(:last) .btn-add').removeClass('btn-add').addClass('btn-remove').removeClass('btn-success').html('');
    }).on('click', '.btn-remove', function (e) {
        e.preventDefault();
        $(this).parents('.repeat-row:first').remove();
        return false;
    });
    
    $('#repeater-rows').on({
        keyup: function () {
            formatCurrency($(this));
        }
        , blur: function () {
            formatCurrency($(this), "blur");
        }
        , change: function(){
            var BalanceTotal = calculateSum('.outstanding-balance');
            var MonthlyRepaymentTotal = calculateSum('.monthly-repayment');
            var NPer = NPER(0.03,50,5000,0);
            alert(NPer);
            $('#OutstandingBalance').text('£' + BalanceTotal);
            $('#MonthlyRepayment').text('£' + MonthlyRepaymentTotal);
            $('#TotalRepayment').val(function() {
                formatCurrency(MonthlyRepaymentTotal);
            });
        }
    }, '.repeat-row input');
                           
});