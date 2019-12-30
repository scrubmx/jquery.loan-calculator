<div id="lmcu-calculator">
    <div class="calculator consolidation">
        <div id="widget" class="inner">
            <div class="column-left">
                <nav>
                    <ul class="calculator-tabs nav-tabs" id="option-tabs" role="tablist">
                        <li class="tab-title"></li>
                        <li> <a data-toggle="tab" class="active tab-calculator" data-target="#sliders-tab" role="tab" aria-controls="tab-sliders"><span>Calculate</span></a> </li>
                        <li> <a data-toggle="tab" class="tab-info" data-target="#info-tab" role="tab" aria-controls="tab-info"><span>Info</span></a> </li>
                        <li> <a data-toggle="tab" class="tab-remind" data-target="#remind-tab" role="tab" aria-controls="pills-contact"><span>Remind me</span></a> </li>
                    </ul>
                </nav>
                <div class="tab-content calculator-body">
                    <div id="sliders-tab" class="sliders tab-pane fade active show">
                        <?php include( plugin_dir_path( __FILE__ ) . '/consolidation-tabs-template.php');?>
                    </div>
                    <div id="info-tab" class="tab-pane fade">
                        <?php include( plugin_dir_path( __FILE__ ) . '/about-tabs-template.php');?>
                    </div>
                    <div id="legal-tab" class="tab-pane fade">
                        <h4>Important information</h4>
                        <p>This summary is for illustrative purposes only, so as to give you, the borrower, an overview of the potential cost of borrowing. All loan decisions and actual rates are dependent upon personal circumstances and credit reference information provided to us by Credit Reference Agencies.</p>
                        <p>Ask for a personalised illustration. Loan products may be withdrawn at any time and are subject to availability at the time of application. London Mutual Credit Union cannot be held responsible for any errors or omissions.</p>
                    </div>
                    <div id="remind-tab" class="tab-pane fade">
                        <?php include( plugin_dir_path( __FILE__ ) . '/contact-tabs-template.php');?>
                    </div>
                </div>
            </div>
            <div class="column-right">
                <!-- Card -->
                <div id="results" class="representative-example">
                    <div class="example-body">
                        <h4>Instructions</h4>
                        <div class="message" id="result_message"><p>This calculator helps you to estimate your current borrowing, and the potential savings of paying it off using a London Mutual Credit Union consolidation loan.</p><p><a href="#" data-toggle="modal" data-target="#infoLegal"><i class="fa fa-exclamation-circle"></i> Important information</a></p></div>
                        <hr/>
                        <div id="example">
                            <h5>Consolidation loan</h5>
                            <ul class="summary">
                                <li id="result_amount">Loan amount: <span class="result">£0.00</span></li>
                                <li id="result_apr">Representative APR: <span class="result"></span></li>
                                <li id="result_months">You will have paid everything off in: <span class="result">0 months</span></li>
                                <li id="result_repayment">Monthly repayment: <span class="result"></span></li>
                                <li id="result_cost" class="invalid">Total interest paid: <span class="result"></span> </li>
                            </ul>
                        </div>
                        <div id="comparison">
                            <h5>Comparison</h5>
                            <ul class="summary">
                                <li id="result_apr">Average credit card APR: <span class="result"></span></li>
                                <li id="result_cost">Total interest paid: <span class="result"></span> </li>
                            </ul>
                        </div>
                        <!-- Button -->
                        <div class="mobile-button">
                            <button type="button" class="btn-apply" data-toggle="modal" data-target="#currentMember"> Apply for this loan </button></div>
                    </div>
                </div>
                <!-- Card -->
            </div>
            <!-- col-sm-10 -->
        </div>
        <!-- row -->
    </div>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div class="modal fade" id="currentMember" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Great stuff. Are you currently a member of London Mutual?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                </div>
                <div class="modal-body d-flex flex-column"><a class="btn btn-primary btn-block" id="MemberApplyLink" href="https://www.cuonline.org.uk/v3/ApplyLoanV3-3.aspx?newmember=no&amount=<?php echo $amount;?>&months=<?php echo $term;?>&skipcalc=true">Yes</a><a id="GuestApplyLink" class="btn btn-primary btn-block" href="https://www.cuonline.org.uk/v3/ApplyLoanV3-2.aspx?newmember=yes&amount=<?php echo $amount;?>&months=<?php echo $term;?>&skipcalc=true">No</a></div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="infoLegal" tabindex="-1" role="dialog" aria-labelledby="ImportantInformation" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ImportantInformation">Important information</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
                </div>
                <div class="modal-body d-flex flex-column"><p>This calculator is provided as an informational tool enabling to compare the cost of borrowing with a typical London Mutual loan, compared to the average APR of a credit card in the UK (<a target="_blank" href="https://www.theguardian.com/money/2019/sep/21/credit-cards-interest-rates-hit-a-record-high">17 Sept 2019</a>).</p><p>Please be aware that:</p>
                    <ul><li>This summary is for illustrative purposes only, so as to give you, the borrower, an overview of the potential cost of borrowing. </li><li>Results should not be considered personalised financial advice, and if in doubt you should always seek independent professional advice.</li><li>The results of this tool will only be as accurate as the information you provide. Results are on the basis of information inputted, but there may be other factors which this tool does not take into account, which could change the result displayed.</li><li>We cannot be held responsible for any inaccuracies, errors or omissions.</li><li>Loan products may be withdrawn at any time and are subject to availability at the time of application.</li><li>All loan decisions and actual rates are dependent upon personal circumstances and credit reference information provided to us by Credit Reference Agencies.</li></ul>
                
                </div>
            </div>
        </div>
    </div>
</div>