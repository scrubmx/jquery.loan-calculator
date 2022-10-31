<div class="con-results">
	<div class="con-results__bd">
		<h4 class="con-results__hd">Your Result</h4>
		<div id="result_message"></div>
		<div class="con-results__summary">
			<h5 class="con-results__summary-hd">Consolidation loan</h5>
			<ul class="con-results__list">
				<li>Loan amount: <span class="js-con-loan-amt-output">£0.00</span></li>
				<li>APR: <span class="js-con-loan-apr-output"></span></li>
				<li>Length: <span class="js-con-loan-length-output">0 months</span></li>
				<li>Repayment: <span class="js-con-loan-repayment-output"></span></li>
				<li class="total">Total interest: <span class="js-con-loan-interest-output"></span> </li>
			</ul>
		</div>
		<div class="con-results__summary ">
			<h5 class="con-results__summary-hd">Comparison</h5>
			<ul class="con-results__list">
				<li id="result_apr">Average credit card APR: <span class="result"></span></li>
				<li class="total" id="result_cost">Total interest paid: <span class="result"></span> </li>
			</ul>
		</div>
		<!-- Button -->
		<div class="mobile-button">
			<a class="calc__btn calc__btn--apply" id="ApplyLink" href="https://apps.creditunion.co.uk/Loan/Default.aspx?amount=<?php echo $amount; ?>&product=CON&months=<?php echo $term; ?>">Apply for this loan </a>
		</div>
	</div>
</div>