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
add_action( 'wp_enqueue_scripts', 'lmcu_scripts' );

function lmcu_scripts() {
wp_register_script( 'calculator-js', plugins_url( 'js/scripts.js' , __FILE__ ), array('jquery'), '1.0.0', true );
    wp_register_style( 'calculator-css', plugins_url( 'css/styles.css' , __FILE__ ));
}
// Enqueue tghe right way
function lmcu_shortcode_scripts() {
    global $post;
    if( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'loan-calculator') ) {
                    wp_enqueue_script( 'calculator-js' );
    wp_enqueue_style( 'calculator-css' );
    }
}
add_action( 'wp_enqueue_scripts', 'lmcu_shortcode_scripts');

// Add Shortcode
static $i = 1;

function lmcu_calculator( $atts ) {

	// Attributes
    $atts = shortcode_atts(
		array(
			'product' => 'Salary deducted loan',
			'apr' => '13.68',
            'rate' => '5.75',
			'minamount' => '100',
            'maxamount' => '15000',
            'minterm' => '1',
            'maxterm' => '60',
            'amount' => '7500',
            'term' => '36',
            'step' => '25',
            'desc' => 'Work for one of our salary deduction partners? Benefit from a special rate with repayments taken straight from your salary.',
            'showcase' => 1,
            'consolidation' => 0,
		),
		$atts
	);
    extract($atts);
    ob_start();?>
    <script type="text/javascript">
        var ProductDefaults = <?php echo json_encode($atts, JSON_PRETTY_PRINT+JSON_NUMERIC_CHECK) ?>;
    </script>
    <?php if($consolidation == 1) {
        include( plugin_dir_path( __FILE__ ) . 'templates/consolidation-template.php');
    } else {
            include( plugin_dir_path( __FILE__ ) . 'templates/calculator-template.php');
        }
    return ob_get_clean();
}

add_shortcode('loan-calculator', 'lmcu_calculator' );