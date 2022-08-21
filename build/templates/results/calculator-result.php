<div class="calc__results-header">
	Monthly repayment: <span class="lg" id="payment"></span>
</div>
<ul class="calc__results-list">
	<li>Borrowing: <span class="strong" id="selected-amount"></span></li>
	<li>Over: <span class="strong" id="selected-duration"></span>&nbsp;Months</li>
	<li>Representative: <span class="strong" id="total-annual-cost"></span>&nbsp;APR</li>
	<li>Total cost of this loan: <span class="strong" id="interest-total"></span></li>
	<li>Total repayable: <span class="strong " id="loan-total"></span> </li>
</ul>
<!-- Button -->
<a class="calc__btn calc__btn--apply" id="ApplyLink" href="https://apps.creditunion.co.uk/Loan/Default.aspx?amount=<?php echo $amount; ?>&months=<?php echo $term; ?>&product=<?php echo $product; ?>&cb=<?php echo $cbond; ?>">Apply for this loan </a>

<p class="calc__terms">
	All loans are subject to affordability checks and our Terms &amp; Conditions.
	Loans are offered subject to status to members aged 18 or over.
	The rates displayed on this page are for illustrative purposes only, and the actual amount and
	interest payable will be indicated in the Loan Agreement provided when we offer you a loan.
</p>
