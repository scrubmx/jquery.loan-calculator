<div id="consolidation">
    <div class="header-row">
        <div class="type">
            <label>Type of debt</label>
        </div>
        <div class="balance">
            <label>Current balance</label>
        </div>
        <div class="repayment">
            <label>Monthly repayment</label>
        </div>
    </div>
    <div id="repeater-rows">
        <div id="" class="repeat-row">
            <div class="type">
                <select>
                    <option value="credit-card">Credit Card</option>
                    <option value="credit-card">Personal Loan</option>
                    <option value="credit-card">Overdraft</option>
                    <option value="credit-card">Other</option>
                </select>
            </div>
            <div class="balance">
                <input data-type="currency" type="text" placeholder="£0.00"> </div>
            <div class="repayment">
                <input data-type="currency" type="text" placeholder="£0.00"> </div>
            <div class="controls">
                <a class="btn btn-add"></a>
            </div>
        </div>
    </div>
    <div id="RepaymentSize" class="repayment-calc">
        <div class="repayment-calc-label">
            <label for="TotalRepayment">How much can you afford to repay each month?</label>
            <p>Increasing this amount will enable you to pay it off sooner.</p>
        </div>
        <div class="repayment-calc-total">
            <input id="TotalRepayment" data-type="currency" type="text" class="form-control" placeholder="£0.00"> </div>
        
    </div>
</div>

<!-- #widget -->