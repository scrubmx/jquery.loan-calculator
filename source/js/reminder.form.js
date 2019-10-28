jQuery(document).ready(function ($) {
    $('#message').hide();
    $('.messages').hide();
    $('#toggle-message').click(function () {
        this.checked ? $('#message').show(500) : $('#message').hide(500); //time for show
    });
    $("#contact-form").submit(function (event) {
        event.preventDefault();
        $('#contact-form .controls').hide(1000);
        $('#contact-form .messages').show(1000);
        var SenderEmail = $('#form_email').val();
        var SenderAmount = parseInt(loanamountslider.noUiSlider.get());
        var SenderTerm = parseInt(loantermslider.noUiSlider.get());
        var SenderMessage = $('#form_message').val();
        console.log(SenderTerm + SenderAmount + SenderEmail);
        //Sendinblue
        (function () {
            window.sib = {
                equeue: []
                , client_key: "uxoli5uunwgpi3uuimmia"
            };
            /* OPTIONAL: email for identify request*/
            window.sib.email_id = SenderEmail;
            window.sendinblue = {};
            for (var j = ['track', 'identify', 'trackLink', 'page'], i = 0; i < j.length; i++) {
                (function (k) {
                    window.sendinblue[k] = function () {
                        var arg = Array.prototype.slice.call(arguments);
                        (window.sib[k] || function () {
                            var t = {};
                            t[k] = arg;
                            window.sib.equeue.push(t);
                        })(arg[0], arg[1], arg[2]);
                    };
                })(j[i]);
            }
            var n = document.createElement("script")
                , i = document.getElementsByTagName("script")[0];
            n.type = "text/javascript", n.id = "sendinblue-js", n.async = !0, n.src = "https://sibautomation.com/sa.js?key=" + window.sib.client_key, i.parentNode.insertBefore(n, i), window.sendinblue.page();
        })();
        // Send parameters
        sendinblue.track('loan_calculator', {
            'email': SenderEmail
        }, {
            'data': {
                'loancalculator': {
                    'amount': SenderAmount
                    , 'length': SenderTerm
                }
                , 'enquiry': {
                    'message': SenderMessage
                }
            }
        });
    });
});