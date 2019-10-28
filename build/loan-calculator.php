<?php 
/*
Plugin Name: LMCU Loan Calculator
Plugin URI: https://creditunion.co.uk
Description: Uses a shortcode to generate a loan calculator using the provided attributes
Version: 0.8
Author: Ben West
Author URI:
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

//Register necessary scripts and styles
add_action( 'wp_enqueue_scripts', 'lmcu_scripts_styles' );

function lmcu_scripts_styles() {
wp_register_script( 'calculator-js', plugins_url( 'js/scripts.js' , __FILE__ ), array('jquery'), '1.0.0', true );
    wp_register_style( 'calculator-css', plugins_url( 'css/styles.css' , __FILE__ ) );
}

// Add Shortcode
static $i = 1;

function lmcu_calculator( $atts ) {
wp_enqueue_script( 'calculator-js' );
    wp_enqueue_style( 'calculator-css' );
	// Attributes
    $atts = shortcode_atts(
		array(
			'product' => 'Personal Loan',
			'apr' => '13.68',
            			'rate' => '12.89',
			'minamount' => '400',
            'maxamount' => '7500',
            'minterm' => '1',
            'maxterm' => '60',
            'defaultamount' => '3500',
            'defaultterm' => '18',
            'step' => '25',
            'desc' => 'The smart alternative to credit cards and arranged overdrafts. Available to all new and existing members in work and with good credit.',
            'showcase' => 1
		),
		$atts
	);
    extract($atts);
    ob_start();?>
    <script type="text/javascript">
        var LoanProduct = <?php echo json_encode($atts, JSON_PRETTY_PRINT) ?>;
        dataLayer = [];
    </script>
    <?php include( plugin_dir_path( __FILE__ ) . 'templates/calculator-template.php');
    return ob_get_clean();
}

add_shortcode('loan-calculator', 'lmcu_calculator' );