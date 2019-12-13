jQuery(document).ready(function ($) {
    //Only fire this up if it's a consolidation calculator
    if (ProductDefaults.consolidation == 1) {
        // Initialize
        $('.btn-apply, #example, #comparison').hide();
        $example = jQuery('#example').loanCalculator();
        $comparison = jQuery('#comparison').loanCalculator();
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
            $('.example-body h4').text('Result');
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
        , interestTotalSelector: '#result_cost .result'
        , totalAnnualCostSelector: '#result_apr .result'
        , paymentSelector: '#result_repayment .result'
    });
}
// Calculate total savings 
function CalculateInterestSaved() {
    var getExampleCost = ConvertToNumber(jQuery('#example #result_cost .result').text());
    var getComparisonCost = ConvertToNumber(jQuery('#comparison #result_cost .result').text());
    if (getExampleCost < getComparisonCost) {
        var TotalSavings = getComparisonCost - getExampleCost;
        var TotalSavings = TotalSavings.toFixed(2);
        var SavingsOutput = '<div class="alert alert-success"><p>Depending on the interest you\'re currently paying, you could pay off everything you owe in around <strong>' + monthstoYears(parseInt(nperMonths)) + '</strong>, saving you <strong>' + ConvertToMoney(TotalSavings) + '</strong> in interest.</p></div>';
    }
    else {
        var SavingsOutput = 'We can\'t save you money';
    }
    console.log(SavingsOutput);
    return SavingsOutput;
}
// Display various result messages
function ConsolidateResult(repayment, balance) {
    nperMonths = NPER(repayment, balance);
    NperResult = NPERResult(repayment, balance);
    jQuery('#result_message').html(NperResult.message);
    if (NperResult.validLoan == 1) {
        jQuery('.btn-apply, #example, #comparison').fadeIn(600);
        jQuery('#result_months .result').hide().html(NperResult.months_readable).fadeIn(600);
        CalculateLoan(NperResult.months, balance, variableInterest(balance), $example);
        CalculateLoan(NperResult.months, balance, convertAPR(24.7), $comparison);
        jQuery('#result_message').html(CalculateInterestSaved());
    }
    else {
        jQuery('.btn-apply, #example, #comparison').fadeOut();
    }
}