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
    if (present > 7500) {
        var result = {
            validLoan: 0,
            message: '<div class="results-message message-black"><h4 class="results-heading">Sorry</h4><p>The maximum amount we can lend for consolidation purposes is £7,500.</p><p>If you owe more than £7,500, a consolidation loan may not be the best option for you.</p><p>Visit the <a href="https://www.moneyadviceservice.org.uk/en/articles/help-if-youre-struggling-with-debt">Money Advice Service</a> for more information about other ways to reduce debt.</p></div>',
            months: nper,
            months_readable: npertext
        }
        return result;
    }
    if (present > 15000) {
        var result = {
            validLoan: 1,
            message: '<div class="results-message message-info">To be eligible to borrow over £15,000, you will need to be a homeowner</div>',
            months: nper,
            months_readable: npertext
        }
        return result;
    } else {
        var nper = NPER(payment, present);
        var nper = Math.round(nper);
        var npertext = monthstoYears(nper);
        if (isFinite(nper)) {
            if (nper > 60) {
                var result = {
                    validLoan: 0,
                    message: '<div class="results-message message-black"><h4 class="results-heading">Sorry</h4><p>Even with our low rates, it would take you <strong>' + npertext + '</strong> to pay everything off.</p><p>The maximum loan term we offer is 5 years.</p><p>If you can afford to, consider increasing your repayments to get it paid off sooner.</div>',
                    months: nper,
                    months_readable: npertext
                }
                return result;
            } else if (nper < 2) {
                var result = {
                    validLoan: 0,
                    message: '<div class="results-message message-green"><h4 class="results-heading">Nice one</h4><p>It looks like you are well on your way to paying everything off already.</p><p>Have you thought about opening a <a href="https://creditunion.co.uk/savings">savings account</a> with us?</p></div>',
                    months: nper,
                    months_readable: npertext
                }
                return result;
            } else {
                var result = {
                    validLoan: 1,
                    message: '<p>Good news. we may be able to save you money.</p>',
                    months: nper,
                    months_readable: npertext
                }
                return result;
            }
        } else {
            var result = {
                validLoan: 0,
                message: '<div class="results-message message-red"><h4 class="results-heading">Sorry</h4><p>At this repayment amount, you are unlikely to ever be able to reduce the amount you owe.</p><p>Consider increasing the amount you repay each month if you can afford to.</p><p>Visit the <a href="https://www.moneyadviceservice.org.uk/en/articles/help-if-youre-struggling-with-debt">Money Advice Service</a> for more information about other ways to reduce debt.</p></div>',
                months: nper,
                months_readable: npertext
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
            one: 'month',
            other: 'months'
        },
        years = {
            one: 'year',
            other: 'years'
        },
        m = value % 12,
        y = Math.floor(value / 12),
        result = [];
    y && result.push(y + ' ' + getPlural(y, years));
    m && result.push(m + ' ' + getPlural(m, months));
    return result.join(' and ');
}
/* 
Convert money into useful formats 
*/
// Format strings into money
var moneyFormat = wNumb({
    mark: '.',
    thousand: ',',
    prefix: '£'
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
        change: function () {
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
    applyurl = "https://apps.creditunion.co.uk/Loan/Default.aspx?newmember=no&amount=" + loanAmount + "&months=" + loanTerm + "&skipcalc=true";
    jQuery('#ApplyLink').attr("href", applyurl);
};
/* 
Set up tabs etc
*/
jQuery(document).ready(function ($) {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').click(function (e) {
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
    $('.info-tabs-nav a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        $('.info-tabs-nav a').not(this).removeClass('active');
    });

    if ($(window).width() < 360) {
        $('.info-tabs-tab-content').collapse({
            toggle: false,
            parent: '#v-pills-tabContent'
        });
    };

});

// GA Push

jQuery(function ($) {

    // Set the buttons id in the jQuery function.
    $("#ApplyLink").on("click", function () {
        dataLayer.push({
            "event": "eventGA",
            "eventCategory": "data1",
            "eventAction": "data-1-click",
            "eventLabel": "yes"
        });
    });


});
