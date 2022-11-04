<div class="con-results">
	<div class="con-results__bd">
		<h4 class="con-results__hd">Your Result</h4>
		<div class="js-result-message-box"></div>
		<div class="con-results__summary d-none">
			<h5 class="con-results__summary-hd">Consolidation loan</h5>
			<ul class="con-results__list">
				<li>
					Loan amount:
					<span class="js-con-loan-amt-output">£0.00</span>
				</li>
				<li>APR:
					<span>
						<span class="js-con-loan-apr-output"></span>%
					</span>
				</li>
				<li>Length:
					<span class="js-con-loan-length-output">0 months</span>
				</li>
				<li>Repayment:
					<span class="js-con-loan-repayment-output"></span>
				</li>
				<li class="total">
					Total interest:
					<span class="js-con-loan-interest-output"></span>
				</li>
			</ul>
		</div>
		<div class="con-results__summary d-none">
			<h5 class="con-results__summary-hd">Comparison</h5>
			<ul class="con-results__list">
				<li>Average credit card APR:
					<span>
						<span class="js-comparison-apr-output"></span>%
					</span>
				</li>
				<li>Total interest paid: <span class="js-comparison-total-interest-output"></span> </li>
			</ul>
			<a class="calc__btn calc__btn--apply" id="ApplyLink" href="https://apps.creditunion.co.uk/Loan/Default.aspx?amount=<?php echo $amount; ?>&product=CON&months=<?php echo $term; ?>">Apply for this loan </a>
		</div>
	</div>
</div>