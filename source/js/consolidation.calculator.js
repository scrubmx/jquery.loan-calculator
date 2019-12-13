jQuery(document).ready(function ($) {
    // Initialize
    $('.btn-apply, .summary').hide();
    $calculator = jQuery('.summary').loanCalculator();
    //Only fire this up if it's a consolidation calculator
    if (ProductDefaults.consolidation == 1) {
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
                $('#result_amount .result').text(ConvertToMoney(BalanceTotal));
                $('#TotalRepayment').val(MonthlyRepaymentTotal).trigger('change');
            }
        }, '.repeat-row input');
        // Do our calculations once the monthly repayment amount is selected
        $('#TotalRepayment').on('change paste keyup', function () {
            var OptionalRepayment = ConvertToNumber($(this).val());
            ConsolidateResult(OptionalRepayment, BalanceTotal);
            setURLS(BalanceTotal, Math.round(NPER(OptionalRepayment, BalanceTotal)));
        });
    }
});

function CalculateLoan(term, amount, rate, selector) {
    selector.loanCalculator('update', {
        loanAmount: amount
        , interestRate: rate
        , loanDuration: term
        , loanTotalSelector: '#result_cost .result'
        , totalAnnualCostSelector: '#result_apr .result'
    });
}
// Display various result messages
function ConsolidateResult(repayment, balance) {
    nperMonths = NPER(repayment, balance);
    NperResult = NPERResult(repayment, balance);
    jQuery('#result_message').html(NperResult.message);
    if (NperResult.validLoan == 1) {
        jQuery('.btn-apply, .summary').show();
        jQuery('#result_months .result').html(NperResult.months_readable);
        CalculateLoan(NperResult.months, balance, variableInterest(balance), $calculator);
    }
    else {
        jQuery('.btn-apply, .summary').hide();
    }
}