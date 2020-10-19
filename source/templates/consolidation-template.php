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
                   

                </div>
            </div>
        </div>
    </div>
</div>
