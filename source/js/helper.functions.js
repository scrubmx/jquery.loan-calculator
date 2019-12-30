/* 
Our nifty NPER functions
*/
function NPER(payment, present, future, type) {
    var type = (typeof type === 'undefined') ? 0 : type;
    var future = (typeof future === 'undefined') ? 0 : future;
    GetRate = variableInterest(present);
    rate = GetRate / 12 / 100;
    rate = eval(rate);
    var num = -payment * (1 + rate * type) - future * rate;
    var den = (present * rate + -payment * (1 + rate * type));
    return Math.log(num / den) / Math.log(1 + rate);
}
// Return readable messages based on the NPER result
function NPERResult(payment, present) {
    if (present > 25000) {
        var result = {
            validLoan: 0
            , message: '<div class="alert alert-warning my-3 p-2">The maximum amount we can lend is £25,000</div>'
            , months: nper
            , months_readable: npertext
        }
        return result;
    }
    if (present > 15000) {
        var result = {
            validLoan: 1
            , message: '<div class="alert alert-info my-3 p-2">To be eligible to borrow over £15,000, you will need to be a homeowner</div>'
            , months: nper
            , months_readable: npertext
        }
        return result;
    }
    else {
        var nper = NPER(payment, present);
        var nper = Math.round(nper);
        var npertext = monthstoYears(nper);
        if (isFinite(nper)) {
            if (nper > 60) {
                var result = {
                    validLoan: 0
                    , message: '<div class="alert alert-warning my-3 p-2"><p>Even with our low rates, it would take you <strong>' + npertext + '</strong> to pay everything off.</p><p>The maximum loan term we offer is 5 years.</p><p>Can you afford to pay more each month to get it paid off sooner?</div>'
                    , months: nper
                    , months_readable: npertext
                }
                return result;
            }
            else if (nper < 2) {
                var result = {
                    validLoan: 0
                    , message: '<div class="alert alert-warning my-3 p-2"><p>It looks like you are well on your way to paying everything off already. Good job. Have you thought about opening a <a href="https://creditunion.co.uk/savings">savings account</a> with us?</p></div>'
                    , months: nper
                    , months_readable: npertext
                }
                return result;
            }
            else {
                var result = {
                    validLoan: 1
                    , message: '<p>Good news. we may be able to save you money.</p>'
                    , months: nper
                    , months_readable: npertext
                }
                return result;
            }
        }
        else {
            var result = {
                validLoan: 0
                , message: '<div class="alert alert-danger my-3 p-2"><p>At this repayment amount, you are likely to ever be able to pay everything off.</p><p>Consider increasing the amount you repay each month if possible.</div>'
                , months: nper
                , months_readable: npertext
            }
            return result;
        }
    }
}
/*
Convert APR to Monthly
*/
function convertAPR(value) {
    return (Math.pow((1 + (Math.pow(((value * 1 / 100) + 1), (1 / 12)) - 1) / 100), 12) - 1) * 100 * 100
}
/* 
Months to years calculations 
*/
function monthstoYears(value) {
    function getPlural(number, word) {
        return number === 1 && word.one || word.other;
    }
    var months = {
            one: 'month'
            , other: 'months'
        }
        , years = {
            one: 'year'
            , other: 'years'
        }
        , m = value % 12
        , y = Math.floor(value / 12)
        , result = [];
    y && result.push(y + ' ' + getPlural(y, years));
    m && result.push(m + ' ' + getPlural(m, months));
    return result.join(' and ');
}
/* 
Convert money into useful formats 
*/
// Format strings into money
var moneyFormat = wNumb({
    mark: '.'
    , thousand: ','
    , prefix: '£'
});

function ConvertToMoney(value) {
    var moneyValue = parseFloat(value);
    return moneyFormat.to(moneyValue);
}

function ConvertToNumber(value) {
    numberValue = moneyFormat.from(value);
    return parseFloat(numberValue);
}
// Change inputs into money
(function ($) {
    $("input[data-type='currency']").on({
        keyup: function () {
            formatCurrency($(this));
        }
        , blur: function () {
            formatCurrency($(this), "blur");
        }
        , change: function () {
            formatCurrency($(this));
        }
        , paste: function () {
            formatCurrency($(this));
        }
    });
})(jQuery);
/*
Sum all fields matching selector and return total
*/
function calculateSum(selector) {
    var sum = 0;
    jQuery(selector).each(function () {
        if (this.value.length != 0) {
            var total = this.value
            sum += ConvertToNumber(total);
        }
    });
    return sum;
}
/* 
Set URLs based on Calculator content 
*/
function setURLS(loanAmount, loanTerm) {
    if (CUOKLoan.hasClass('active')) {
        applyurlMember = "https://www.cuonline.org.uk/PDL2/Default.aspx?CU=LMCU&amount=" + loanAmount + "&months=" + loanTerm + "&FP=1";
        applyurlGuest = "https://www.cuonline.org.uk/PDL2/Default.aspx?CU=LMCU&amount=" + loanAmount + "&months=" + loanTerm + "&FP=1";
    }
    else {
        applyurlMember = "https://www.cuonline.org.uk/v3/ApplyLoanV3-3.aspx?newmember=no&amount=" + loanAmount + "&months=" + loanTerm + "&skipcalc=true";
        applyurlGuest = "https://www.cuonline.org.uk/v3/ApplyLoanV3-2.aspx?newmember=yes&amount=" + loanAmount + "&months=" + loanTerm + "&skipcalc=true";
    };
    jQuery('#GuestApplyLink').attr("href", applyurlGuest);
    jQuery('#MemberApplyLink').attr("href", applyurlMember);
};
/* 
Set up tabs etc
*/
jQuery(document).ready(function ($) {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').click(function(e) {
  e.preventDefault();
});
    //Move modal in DOM and set up tabs and popovers
    $('.modal').appendTo("body");
    $('[data-toggle="popover"]').popover();
    $('#option-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        $('#option-tabs a').not(this).removeClass('active');
    });
    $('#info-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        $('#info-tabs a').not(this).removeClass('active');
    });
});
/* PMT
 */