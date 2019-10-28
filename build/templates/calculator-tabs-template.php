<p id="product-description"></p>
<div id="saver" class="form-inline">
    <div class="form-group">
        <label for="saved-amount">I have</label>
        <input class="form-control" data-type="currency" id="saved-amount" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency" placeholder="£500.00" name="saved-amount">
        <label> saved </label>
    </div>
</div>
<div class="slider">
    <label for="loan-amount">I want to borrow <span class="selected-amount"></span></label>
    <div id="loanamount"></div>
</div>
<div class="slider">
    <label for="loan-duration">and repay over <span class="selected-term"></span></label>
    <div id="loanterm"></div>
</div>
<!-- #widget -->