<div id="lmcu-calculator">
    <div class="d-none">
        <!-- inject:svg -->
        <!-- endinject -->
    </div>
    <div class="calculator consolidation">
        <div id="widget" class="inner">
            <div class="intro">
                <h4>Instructions</h4>
                <p>This calculator helps you to estimate your current borrowing, and the potential savings of paying it off using a London Mutual Credit Union consolidation loan.</p>
                <p><a href="#" data-toggle="modal" data-target="#infoLegal"><svg class="icon">
                            <use xlink:href="#icon_question" />
                        </svg> Important information</a></p>
            </div>
            <div class="calculator-left">
                <nav class="product">
                    <h3 class="product-title"> <span id="product-name"></span></h3>
                    <ul class="product-options" id="option-tabs" role="tablist">

                        <li> <a data-toggle="tab" class="active tab-calculator" data-target="#sliders-tab" role="tab" aria-controls="tab-sliders"><svg class="icon">
                                    <use xlink:href="#icon_calculator" />
                                </svg> <span>Calculate</span></a> </li>
                        <li> <a data-toggle="tab" class="tab-info" data-target="#info-tab" role="tab" aria-controls="info-tab"><svg class="icon">
                                    <use xlink:href="#icon_info" />
                                </svg> <span>Info</span></a> </li>
                        <li> <a data-toggle="tab" class="tab-remind" data-target="#remind-tab" role="tab" aria-controls="pills-contact"><svg class="icon">
                                    <use xlink:href="#icon_bell" />
                                </svg> <span>Remind me</span></a> </li>
                    </ul>
                </nav>
                <div class="tab-content calculator-body">
                    <div id="sliders-tab" class="sliders tab-pane fade active show">
                        <?php include( plugin_dir_path( __FILE__ ) . '/consolidation-tabs-template.php');?>
                    </div>
                    <div id="info-tab" class="tab-pane fade">
                        <?php include( plugin_dir_path( __FILE__ ) . '/about-tabs-template.php');?>
                    </div>
                    <div id="remind-tab" class="tab-pane fade">
                        <?php include( plugin_dir_path( __FILE__ ) . '/contact-tabs-template.php');?>
                    </div>
                </div>
            </div>
            <div class="calculator-right">
                <!-- Card -->


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
                <div class="modal-body d-flex flex-column">
                    <p>This calculator is provided as an informational tool enabling to compare the cost of borrowing with a typical London Mutual loan, compared to the average APR of a credit card in the UK (<a target="_blank" href="https://www.theguardian.com/money/2019/sep/21/credit-cards-interest-rates-hit-a-record-high">17 Sept 2019</a>).</p>
                    <p>Please be aware that:</p>
                    <ul>
                        <li>This summary is for illustrative purposes only, so as to give you, the borrower, an overview of the potential cost of borrowing. </li>
                        <li>Results should not be considered personalised financial advice, and if in doubt you should always seek independent professional advice.</li>
                        <li>The results of this tool will only be as accurate as the information you provide. Results are on the basis of information inputted, but there may be other factors which this tool does not take into account, which could change the result displayed.</li>
                        <li>We cannot be held responsible for any inaccuracies, errors or omissions.</li>
                        <li>Loan products may be withdrawn at any time and are subject to availability at the time of application.</li>
                        <li>All loan decisions and actual rates are dependent upon personal circumstances and credit reference information provided to us by Credit Reference Agencies.</li>
                    </ul>

                </div>
            </div>
        </div>
    </div>
</div>
