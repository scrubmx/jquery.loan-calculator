<div id="consolidation">
    <div class="header-row form-row">
        <div class="col-4">
            <label>Type of debt</label>
        </div>
        <div class="col-3">
            <label>Current balance</label>
        </div>
        <div class="col-3">
            <label>Monthly repayment</label>
        </div>
    </div>
    <div id="repeater-rows">
        <div class="form-row repeat-row pb-3">
            <div class="col-4">
                <select class="form-control">
                    <option value="credit-card">Credit Card</option>
                    <option value="credit-card">Personal Loan</option>
                    <option value="credit-card">Overdraft</option>
                    <option value="credit-card">Other</option>
                </select>
            </div>
            <div class="col-3">
                <input data-type="currency" type="text" class="form-control outstanding-balance" placeholder="£0.00"> </div>
            <div class="col-3">
                <input data-type="currency" type="text" class="form-control monthly-repayment" placeholder="£0.00"> </div>
            <div class="col d-flex"> <a class="btn btn-add"></a></div>
        </div>
    </div>
     <div id="RepaymentSize" class="form-row my-5">
         <div class="col-7"><label for="loan-duration">How much can you afford to repay each month?</label></div>
          <div class="col-3">
                <input id="TotalRepayment" data-type="currency" type="text" class="form-control planned-repayment" placeholder="£0.00"> </div>
         
</div></div>
    
    <div id="Summary">
    <h3>Based on what you've told us</h3>
        <ul><li>Total you owe <span id="OutstandingBalance">£0.00</span></li>
        <li>Monthly repayment <span id="OutstandingBalance">£0.00</span></li>
            <li>Amount Paid in interest</li>
             <li>Amount saved on typical credit card rate (24.9%)</li>
            
            <li></li>
        </ul>
    
   
        
        
    

</div>
<!-- #widget -->