<?php 
/*
Plugin Name: LMCU Loan Calculator
Plugin URI:  https://github.com/lmculondon/lmcu-loan-calculator
Description: Configurable Loan Calculator with Shortcode
Version:     3.0.19
Author:      London Mutual Credit Union
Author URI:  https://creditunion.co.uk/
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

//Register necessary scripts and styles
add_action( 'wp_enqueue_scripts', 'lmcu_scripts' );

function lmcu_scripts() {
	wp_register_script( 'lmcu-calculator', plugins_url( 'js/scripts.js' , __FILE__ ), array('jquery'), '1.0.0', true );
    wp_register_style( 'lmcu-calculator', plugins_url( 'css/styles.css' , __FILE__ ));
}
// Enqueue the right way
function lmcu_shortcode_scripts() {
    global $post;
    if( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'loan-calculator') ) {
            wp_enqueue_script( 'lmcu-calculator' );
   			wp_enqueue_style( 'lmcu-calculator' );
    }
}
add_action( 'wp_enqueue_scripts', 'lmcu_shortcode_scripts');

// Add Shortcode
static $i = 1;
function lmcu_calculator( $atts ) {
	// Attributes
    $atts = shortcode_atts(
		array(
			'displayname' => 'Personal Loan',
            'rate' => '5.75',
			'minamount' => '100',
            'maxamount' => '15000',
            'minterm' => '1',
            'maxterm' => '60',
            'amount' => '7500',
            'term' => '36',
            'step' => '25',
            'product' => '',
			'options-tabs' => false,
            'debugmode' => false,
            'desc' => 'Move the sliders to select how much you would like to borrow, and over how long.',
            'showcase' => 0,
		),
		$atts
	);
    extract($atts);
    ob_start();?>

<script type="text/javascript">
	var ProductDefaults = <?php echo json_encode($atts, JSON_PRETTY_PRINT+JSON_NUMERIC_CHECK) ?>;
    var cBond = "";
	<?php 
    $cbond = $_GET['cb'];
    echo 'var cBond ="' . $cbond . '"';
    ?>
</script>
<?php 
            include( plugin_dir_path( __FILE__ ) . 'templates/calculator-template.php');
      
    return ob_get_clean();
}

add_shortcode('loan-calculator', 'lmcu_calculator' );
