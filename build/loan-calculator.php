<?php 
/*
Plugin Name: LMCU Loan Calculator
Plugin URI:  https://github.com/lmculondon/lmcu-loan-calculator
Description: Configurable Loan Calculator with Shortcode
Version:     2.7.1
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
                    wp_enqueue_script( 'calculator-js' );
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
			'optionstabs' => false,
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
<?php 
            include( plugin_dir_path( __FILE__ ) . 'templates/calculator-template.php');
      
    return ob_get_clean();
}

add_shortcode('loan-calculator', 'lmcu_calculator' );

// Allow updates via Github
include_once( plugin_dir_path( __FILE__ ) . 'lib/updater.php');

if (is_admin()) { // note the use of is_admin() to double check that this is happening in the admin
		$config = array(
			'slug' => plugin_basename(__FILE__), // this is the slug of your plugin
			'proper_folder_name' => 'lmcu-loan-calculator', // this is the name of the folder your plugin lives in
			'api_url' => 'https://api.github.com/repos/lmculondon/lmcu-loan-calculator', // the GitHub API url of your GitHub repo
			'raw_url' => 'https://raw.github.com/lmculondon/lmcu-loan-calculator/master', // the GitHub raw url of your GitHub repo
			'github_url' => 'https://github.com/lmculondon/lmcu-loan-calculator', // the GitHub url of your GitHub repo
			'zip_url' => 'https://github.com/lmculondon/lmcu-loan-calculator/raw/master/dist/lmcu-loan-calculator.zip', // the zip url of the GitHub repo
			'sslverify' => true, // whether WP should check the validity of the SSL cert when getting an update, see https://github.com/jkudish/WordPress-GitHub-Plugin-Updater/issues/2 and https://github.com/jkudish/WordPress-GitHub-Plugin-Updater/issues/4 for details
			'requires' => '3.0', // which version of WordPress does your plugin require?
			'tested' => '3.3', // which version of WordPress is your plugin tested up to?
			'readme' => 'README.md', // which file to use as the readme for the version number
		);
		new WP_GitHub_Updater($config);
	}
