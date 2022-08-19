<div id="lmcu-calculator">
	<div class="d-none">
		<!-- inject:svg -->
		<!-- endinject -->
	</div>
	<div class="lmcu-calc">
		<?php 
			if($showcase == 1) {
				include( plugin_dir_path( __FILE__ ) . '/product-showcase-template.php');
			};
		?>
		<main id="widget" class="lmcu-calc__inner">
			<div class="lmcu-calc__left">
				<nav class="product">
					<h3 class="product-title">
						<span id="product-displayname">
						<?php if($product == 'CON') { ?>
    						Calculate a Consolidation Loan
						<?php }; ?>
						</span></h3>
					<?php if($optionstabs): ?>
					<ul class="product-options" id="option-tabs" role="tablist">
						<?php if($product == 'CON'): ?>
						<li> <a data-toggle="tab" class="active tab-consolidation" data-target="#consolidation-tab" role="tab" aria-controls="tab-sliders"><svg class="icon">
									<use xlink:href="#icon_calculator" />
								</svg> <span>Calculate</span></a> </li><?php else: ?>
						<li> <a data-toggle="tab" class="active tab-sliders" data-target="#sliders-tab" role="tab" aria-controls="tab-sliders"><svg class="icon">
									<use xlink:href="#icon_calculator" />
								</svg> <span>Calculate</span></a> </li>
						<?php endif;?>
						<li> <a data-toggle="tab" class="tab-info" data-target="#info-tab" role="tab" aria-controls="info-tab"><svg class="icon">
									<use xlink:href="#icon_info" />
								</svg> <span>Info</span></a> </li>
						<li> <a data-toggle="tab" class="tab-remind" data-target="#remind-tab" role="tab" aria-controls="pills-contact"><svg class="icon">
									<use xlink:href="#icon_save" />
								</svg> <span>Save</span></a> </li>
					</ul>
					<?php endif;?>
				</nav>
				<div class="calculator-body">
					<?php 
						if($product == 'CON') {
							include( plugin_dir_path( __FILE__ ) . 'tabs/consolidation-tabs-template.php');
						} 
						else {
							include( plugin_dir_path( __FILE__ ) . 'tabs/slider-tabs-template.php');
						};
						if($optionstabs) :
							include( plugin_dir_path( __FILE__ ) . 'tabs/about-tabs-template.php');
							include( plugin_dir_path( __FILE__ ) . 'tabs/contact-tabs-template.php');
						endif; 
					?>
				</div>
			</div>
			<div class="calculator-right">
				<?php 
					if($product == 'CON') {
						include( plugin_dir_path( __FILE__ ) . 'results/consolidation-result.php');
					} 
					else {
						include( plugin_dir_path( __FILE__ ) . 'results/calculator-result.php');
					};  
				?>
			</div>
		</main>
	</div>
</div>
