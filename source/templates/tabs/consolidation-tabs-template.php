 <div id="consolidation-tab" class="calculator-body-item sliders active">
     <div class="calculator-body-description">
         <p>This calculator helps you to estimate your current borrowing, and the potential savings of paying it off using a London Mutual Credit Union consolidation loan.</p>
         <p><a href="#" data-toggle="modal" data-target="#infoLegal"><i class="fa fa-exclamation-circle"></i> Important information</a></p>
     </div>
     <h4>Provide details of your current borrowing below</h4>
     <div class="header-row">
         <div class="type">
             <label>Type</label>
         </div>
         <div class="balance">
             <label>Balance <a href="#" inputmode="numeric" data-toggle="tooltip" data-placement="top" title="How much you currently owe"><svg class="icon">
                         <use xlink:href="#icon_question" />
                     </svg></a></label>
         </div>
         <div class="repayment">
             <label>Repayment <a href="#" inputmode="numeric" data-toggle="tooltip" data-placement="top" title="How much you typically repay each month"><svg class="icon">
                         <use xlink:href="#icon_question" />
                     </svg></a></label>
         </div>
     </div>
     <div id="repeater-rows">
         <div id="" class="repeat-row">
             <div class="type">
                 <select class="form-control">
                     <option value="credit-card">Credit Card</option>
                     <option value="credit-card">Personal Loan</option>
                     <option value="credit-card">Overdraft</option>
                     <option value="credit-card">Other</option>
                 </select>
             </div>
             <div class="balance">
                 <input class="form-control" data-type="currency" inputmode="numeric" type="text" placeholder="£0.00">
             </div>
             <div class="repayment">
                 <input class="form-control" data-type="currency" inputmode="numeric" type="text" placeholder="£0.00">
             </div>
             <div class="controls">
                 <a class="btn btn-add"></a>
             </div>
         </div>
     </div>
     <div id="RepaymentSize" class="repayment-calc">
         <div class="repayment-calc-label">
             <h6>Total monthly repayment <a href="#" data-toggle="tooltip" data-placement="top" title="We've added this up for you. You should increase it if you can afford to, though."><svg class="icon">
                         <use xlink:href="#icon_question" />
                     </svg></a></h6>
             <p>Increasing this will enable you to pay everything off sooner, and is likely to reduce the amount of interest you end up paying.</p>
         </div>
         <div class="repayment-calc-total">
             <input id="TotalRepayment" inputmode="numeric" data-type="currency" type="text" class="form-control" placeholder="£0.00">
         </div>
         <div class="mobile-btn-row"><a href="#results">Calculate</a></div>

     </div>
 </div>

 <!-- #widget -->
