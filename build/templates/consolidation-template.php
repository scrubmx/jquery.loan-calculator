<div id="lmcu-calculator">
    <div class="calculator consolidation">
        <div id="widget" class="inner">
            <div class="column-left">
                <nav>
                    <ul class="calculator-tabs nav-tabs" id="option-tabs" role="tablist">
                        <li class="tab-title">Consolidation Loan </li>
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
                <div class="representative-example">
                    <div class="example-body">
                        <h5>Result</h5>
                        <div id="result_message">Enter details of what you owe, and we'll try to estimate how much you could save by moving your borrowing to us.</div>
                        <ul class="summary">
                            <li id="result_amount">Amount to consolidate: <span class="result">£0.00</span></li>
                            <li id="result_apr">Representative APR: <span class="result"></span></li>
                            <li id="result_months">You will have paid everything off in: <span class="result">0 months</span></li>
                            <li id="result_cost">Total cost: <span class="result"></span> </li>
                        </ul>
                        <!-- Button -->
                        <button type="button" class="btn-apply" data-toggle="modal" data-target="#currentMember"> Apply for consolidation loan </button>
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
</div>