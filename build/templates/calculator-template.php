<div id="lmcu-calculator">
    <div class="calculator">
        <?php 
            if($showcase) :?>
            <?php include( plugin_dir_path( __FILE__ ) . '/product-showcase-template.php');?>
                <?php endif;?>
                    <div id="widget" class="inner">
                        <div class="column-left">
                            <nav>
                                <ul class="calculator-tabs nav-tabs" id="option-tabs" role="tablist">
                                    <li class="tab-title"> <span id="product-name"></span> </li>
                                    <li> <a data-toggle="tab" class="active tab-calculator" data-target="#sliders-tab" role="tab" aria-controls="tab-sliders"><span>Calculator</span></a> </li>
                                    <li> <a data-toggle="tab" class="tab-info" data-target="#info-tab" role="tab" aria-controls="tab-info"><span>Loan details</span></a> </li>
                                    <li> <a data-toggle="tab" class="tab-remind" data-target="#remind-tab" role="tab" aria-controls="pills-contact"><span>Remind me later</span></a> </li>
                                </ul>
                            </nav>
                            <div class="tab-content calculator-body">
                                <div id="sliders-tab" class="sliders tab-pane fade active show">
                                    <?php include( plugin_dir_path( __FILE__ ) . '/calculator-tabs-template.php');?>
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
                                    <h5>Representative example</h5>
                                    <ul class="summary">
                                        <li>Monthly repayment: <span class="strong" id="payment"></span></li>
                                        <li>Representative APR: <span class="strong" id="total-annual-cost"></span></li>
                                        <li>Total repayable: <span class="strong " id="loan-total"></span> </li>
                                    </ul>
                                    <!-- Button --><a class="btn-apply" id="ApplyLink" href="https://www.cuonline.org.uk/v3/ApplyLoanV3-3.aspx?newmember=no&amount=<?php echo $defaultamount;?>&months=<?php echo $defaultterm;?>&skipcalc=true">Apply for this loan</a> </div>
                            </div>
                            <!-- Card -->
                        </div>
                        <!-- col-sm-10 -->
                    </div>
                    <!-- row -->
    </div>
</div>