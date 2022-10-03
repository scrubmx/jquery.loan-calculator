<div id="consolidation-tab" class="calculator-body-item sliders active">
	<div class="calculator-body-description">
		<p>This calculator helps you to estimate your current borrowing, and the potential savings of paying it off using a London Mutual Credit Union consolidation loan.</p>
		<details class="details-block mb-0">
			<summary class="details-block__summary" aria-controls="details-content-0" tabindex="0"> Important information </summary>
			<div class="details-block__details-txt" id="details-content-0">
				<p>This calculator is provided as an informational tool enabling to compare the cost of borrowing with a typical London Mutual loan, compared to the average APR of a credit card in the UK (<a target="_blank" href="https://www.independent.co.uk/money/average-credit-card-purchase-apr-hits-new-high-b1924228.html">21 Sept 2021</a>).</p>
				<p>Please be aware that:</p>
				<ul>
					<li>This summary is for illustrative purposes only, so as to give you, the borrower, an overview of the potential cost of borrowing. </li>
					<li>Results should not be considered personalised financial advice, and if in doubt you should always seek independent professional advice.</li>
					<li>The results of this tool will only be as accurate as the information you provide. Results are on the basis of information inputted, but there may be other factors which this tool does not take into account, which could change the result displayed.</li>
					<li>We cannot be held responsible for any inaccuracies, errors or omissions.</li>
					<li>Loan products may be withdrawn at any time and are subject to availability at the time of application.</li>
					<li>All loan decisions and actual rates are dependent upon personal circumstances and credit reference information provided to us by Credit Reference Agencies.</li>
				</ul>
			</div>
		</details>
	</div>
	<h4>What you currently owe</h4>
	<div class="header-row">
		<div class="type">
			<label>Type</label>
		</div>
		<div class="balance">
			<label>Balance
				<a href="#" inputmode="numeric" data-toggle="tooltip" data-placement="top" title="How much you currently owe">
					<svg class="icon">
						<use xlink:href="#icon_question" /> </svg>
				</a>
			</label>
		</div>
		<div class="repayment">
			<label>Repayment
				<a href="#" inputmode="numeric" data-toggle="tooltip" data-placement="top" title="How much you typically repay each month">
					<svg class="icon">
						<use xlink:href="#icon_question" /> </svg>
				</a>
			</label>
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
				<input class="form-control" data-type="currency" inputmode="numeric" type="text" placeholder="£0.00"> </div>
			<div class="repayment">
				<input class="form-control" data-type="currency" inputmode="numeric" type="text" placeholder="£0.00"> </div>
			<div class="controls">
				<a class="btn btn-add"></a>
			</div>
		</div>
	</div>
	<div id="RepaymentSize" class="repayment-calc">
		<div class="repayment-calc-label">
			<h5>What you can afford to repay each month <a href="#" data-toggle="tooltip" data-placement="top" title="We've added this up for you. You should increase it if you can afford to, though."><svg class="icon">
						<use xlink:href="#icon_question" />
					</svg></a></h5>
			<p>Increasing this will enable you to pay everything off sooner, saving you money on interest.</p>
		</div>
		<div class="repayment-calc-total">
			<input id="TotalRepayment" inputmode="numeric" data-type="currency" type="text" class="form-control" placeholder="£0.00"> </div>
		<div class="mobile-btn-row"><a href="#results">Calculate</a></div>
	</div>
</div>
<!-- #widget -->
