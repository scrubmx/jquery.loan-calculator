/* Our nifty NPER function */
//the price calculation formula
//@return the price and length of time
function NPER(payment, present, future, type) {
    // Initialize type
    var type = (typeof type === 'undefined') ? 0 : type;
    // Initialize future value
    var future = (typeof future === 'undefined') ? 0 : future;
    GetRate = variableInterest(present);
    rate = GetRate / 12 / 100;
    // Evaluate rate and periods (TODO: replace with secure expression evaluator)
    rate = eval(rate);
    // Return number of periods
    var num = -payment * (1 + rate * type) - future * rate;
    var den = (present * rate + -payment * (1 + rate * type));
    return Math.log(num / den) / Math.log(1 + rate);
}

function NPERReadable(nper) {
    console.log(nper);
    if (isFinite(nper)) {
        if (nper > 60) {
            nper = Math.round(nper);
            nper = monthstoYears(nper);
            return '<div class="alert alert-danger small my-3 p-2">It would take you <strong>' + nper + '</strong> to pay everything off at this repayment rate. The maximum loan term we offer is 5 years. Try increasing your monthly repayment amount.</div>';
        }
        else {
            nper = Math.round(nper);
            nper = monthstoYears(nper);
            return nper;
        }
    }
    else {
        return '<div class="alert alert-danger small my-3 p-2">Your current repayment amount is too low to ever repay the debt. Try to increase your monthly payment amount.</div>';
    }
}
/* Main jobbie */
jQuery(document).ready(function ($) {
    //Sum up all inputs with same class
    function calculateSum(selector) {
        var sum = 0;
        $(selector).each(function () {
            if (this.value.length != 0) {
                var currency = this.value
                var rawNumber = Number(currency.replace(/[^0-9.-]+/g, ""));
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
    //When a value in the row is changed, add it up
    $('#repeater-rows').on({
        keyup: function () {
            formatCurrency($(this));
        }
        , blur: function () {
            formatCurrency($(this), "blur");
        }
        , change: function () {
            BalanceTotal = calculateSum('.balance input');
            MonthlyRepaymentTotal = calculateSum('.repayment input');
            $('#total-loan').text('£' + BalanceTotal);
            $('#TotalRepayment').val(MonthlyRepaymentTotal).trigger('change');
        }
    }, '.repeat-row input');
    $('#TotalRepayment').on('change paste keyup', function () {
        var OptionalRepayment = Number($(this).val().replace(/[^0-9.-]+/g, ""));
        MonthsTotalRaw = NPER(OptionalRepayment, BalanceTotal);
        MonthsTotalReadable = NPERReadable(MonthsTotalRaw);
        $('#total-term').html(MonthsTotalReadable);
        $calculator.loanCalculator('update', {
            loanAmount: BalanceTotal,
            loanDuration: MonthsTotalRaw
            , interestRate: variableInterest(BalanceTotal)
        });
        //console.log('Total repayable ' + BalanceTotal + ', Monthly payment ' + OptionalRepayment);
    });
});