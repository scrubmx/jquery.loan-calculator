 <!-- <div id="sliders-tab" class="calculator-body-item sliders active">
     <p id="product-description" class="calculator-body-description"></p>
     <div id="saver" class="saver">
         <div class="form-group">
             <label for="saved-amount">How much do you have saved with us?</label>
             <input class="form-control" data-type="currency" id="saved-amount" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency" placeholder="£0.00" name="saved-amount">
         </div>
     </div>
     <div class="slider">
         <label for="loan-amount">I want to borrow <span class="selected-amount js-slider-val-output"></span></label>
         <div id="loanamount" class="js-amount-slider"></div>
     </div>
     <div class="slider">
         <label for="loan-duration">and repay over <span class="selected-term"></span></label>
         <div id="loanterm" class="js-duration-slider"></div>
     </div>
 </div> -->
 <?php if ($product == 'SAV') { ?>
     <h4>Calculate how much you can borrow</h4>
     <div id="saver" class="saver">
         <div class="form-group">
             <label for="saved-amount">How much do you have saved with us?</label>
             <input class="form-control js-con-saved-amt-input" data-type="currency" id="saved-amount" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency" placeholder="£0.00" name="saved-amount">
         </div>
     </div>
 <?php }; ?>

 <div class="calc__sliders">
     <div class="calc-slider">
         <label for="loan-amount">I want to borrow
             <span class="js-slider-val-output calc-slider__val-output"></span>
         </label>
         <div class="js-amount-slider"></div>
     </div>
     <div class="calc-slider">
         <label for="loan-duration">and repay over
             <span class="js-selected-term calc-slider__val-output"></span>
         </label>
         <div class="js-duration-slider"></div>
     </div>
 </div>     