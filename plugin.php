<?php
/**
 * Plugin Name: Greenshift Spline 3d Addon
 * Description: Smart Loader for Spline 3d models
 * Author: Wpsoul
 * Author URI: https://greenshiftwp.com
 * Version: 0.1
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
} 

// Define Dir URL
define('GREENSHIFTSPLINE_DIR_URL', plugin_dir_url(__FILE__));
define( 'GREENSHIFTSPLINE_DIR_PATH', plugin_dir_path( __FILE__ ) );

// Define Freemius
if ( ! function_exists( 'gspb_spline_freemius' ) ) {
    // Create a helper function for easy SDK access.
    function gspb_spline_freemius() {
        global $gspb_spline_freemius;

        if ( ! isset( $gspb_spline_freemius ) ) {
            // Include Freemius SDK.
            if ( file_exists( dirname( dirname( __FILE__ ) ) . '/greenshift-animation-and-page-builder-blocks/fs/start.php' ) ) {
                // Try to load SDK from parent plugin folder.
                require_once dirname( dirname( __FILE__ ) ) . '/greenshift-animation-and-page-builder-blocks/fs/start.php';
            } else {
                return;
            }

            $gspb_spline_freemius = fs_dynamic_init( array(
                'id'                  => '10067',
                'slug'                => 'greenshiftquery',
                'type'                => 'plugin',
                'public_key'          => 'pk_c13054cce47b96031b396db7000b9',
                'is_premium'          => true,
                'is_premium_only'     => true,
                'has_paid_plans'      => true,
                'is_org_compliant'    => false,
                'parent'              => array(
                    'id'         => '9740',
                    'slug'       => 'greenshift-animation-and-page-builder-blocks',
                    'public_key' => 'pk_672fcb7f9a407e0858ba7792d43cb',
                    'name'       => 'Greenshift - Animation and page builder for Gutenberg Wordpress',
                ),
                'menu'                => array(
                    'first-path'     => 'plugins.php',
                    'account'        => false,
                    'support'        => false,
                ),
                'secret_key'          => 'sk_xiN5oP3t?{iB:T7zHntFgomy~Ia5y',
            ) );
        }

        return $gspb_spline_freemius;
    }
}

function gspb_spline_freemius_is_parent_active_and_loaded() {
    // Check if the parent's init SDK method exists.
    return function_exists( 'gspb_freemius' );
}

function gspb_spline_freemius_is_parent_active() {
    $active_plugins = get_option( 'active_plugins', array() );

    if ( is_multisite() ) {
        $network_active_plugins = get_site_option( 'active_sitewide_plugins', array() );
        $active_plugins         = array_merge( $active_plugins, array_keys( $network_active_plugins ) );
    }

    foreach ( $active_plugins as $basename ) {
        if ( 0 === strpos( $basename, 'greenshift-animation-and-page-builder-blocks/' ) ||
             0 === strpos( $basename, 'greenshift-animation-and-page-builder-blocks-premium/' )
        ) {
            return true;
        }
    }

    return false;
}

function gspb_spline_freemius_init() {
    if ( gspb_spline_freemius_is_parent_active_and_loaded() ) {

		
		// Init Freemius.
		//gspb_spline_freemius();
		

		// Signal that the add-on's SDK was initiated.
		do_action( 'gspb_spline_freemius_loaded' );

		// Parent is active, add your init code here.
		

		// Hook: Editor assets.
		add_action('enqueue_block_editor_assets', 'greenShiftSpline_editor_assets');

    } else {
        // Parent is inactive, add your error handling here.
		add_action( 'admin_notices', 'gspb_spline_admin_notice_warning' );
    }
}


if ( gspb_spline_freemius_is_parent_active_and_loaded() ) {
	// If parent already included, init add-on.
	gspb_spline_freemius_init();
} else if ( gspb_spline_freemius_is_parent_active() ) {
	// Init add-on only after the parent is loaded.
	add_action( 'gspb_freemius_loaded', 'gspb_spline_freemius_init' );
} else {
	// Even though the parent is not activated, execute add-on for activation / uninstall hooks.
	gspb_spline_freemius_init();
}


/**
 * GreenShift Blocks Category
 */
if(!function_exists('gspb_greenShiftSpline_category')){
	function gspb_greenShiftSpline_category( $categories, $post ) {
		return array_merge(
			array(
				array(
					'slug'  => 'greenShiftSpline',
					'title' => __( 'GreenShift 3D'),
				),
			),
			$categories
		);
	}
}
add_filter( 'block_categories_all', 'gspb_greenShiftSpline_category', 1, 2 );

//////////////////////////////////////////////////////////////////
// Register server side
//////////////////////////////////////////////////////////////////
require_once GREENSHIFTSPLINE_DIR_PATH .'blockrender/spline3d/block.php';


//////////////////////////////////////////////////////////////////
// Functions to render conditional scripts
//////////////////////////////////////////////////////////////////

// Hook: Frontend assets.
add_action('init', 'greenShiftSpline_register_init');

if(!function_exists('greenShiftSpline_register_init')){
	function greenShiftSpline_register_init()
	{

        wp_register_script(
           'gspbspline3d',
           GREENSHIFTSPLINE_DIR_URL . 'libs/spline3d/runtime.js',
           array(),
           '1.0',
           true
        );
	}
}


add_filter('render_block', 'greenShiftSpline_block_script_assets', 10, 2);
if(!function_exists('greenShiftSpline_block_script_assets')){
	function greenShiftSpline_block_script_assets($html, $block)
	{
		// phpcs:ignore
	
		//Main styles for blocks are loaded via Redux. Can be found in src/customJS/editor/store/index.js and src/gspb-library/helpers/reusable_block_css/index.js
	
		if(!is_admin()){
			if ($block['blockName'] == 'greenshift-blocks/spline3d') {
				//wp_enqueue_script('gspbspline3d');
			}
		}
	
		return $html;
	}
}

//////////////////////////////////////////////////////////////////
// Enqueue Gutenberg block assets for backend editor.
//////////////////////////////////////////////////////////////////

if(!function_exists('greenShiftSpline_editor_assets')){
	function greenShiftSpline_editor_assets()
	{
		// phpcs:ignor
	
		$index_asset_file = include(GREENSHIFTSPLINE_DIR_PATH . 'build/index.asset.php');
	
	
		// Blocks Assets Scripts
		wp_enqueue_script(
			'greenShiftSpline-block-js', // Handle.
			GREENSHIFTSPLINE_DIR_URL . 'build/index.js',
			array('greenShift-editor-js', 'greenShift-library-script', 'wp-block-editor', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-data'),
			$index_asset_file['version'],
			true
		);
		
	
		// Styles.
		wp_enqueue_style(
			'greenShiftSpline-block-css', // Handle.
			GREENSHIFTSPLINE_DIR_URL . 'build/index.css', // Block editor CSS.
			array('greenShift-library-editor', 'wp-edit-blocks', 'greenShift-icons'),
			$index_asset_file['version']
		);

	}
}

//////////////////////////////////////////////////////////////////
// Show if parent is not loaded
//////////////////////////////////////////////////////////////////
function gspb_spline_admin_notice_warning() {
	?>
	<div class="notice notice-warning">
		<p><?php printf( __( 'Please, activate %s plugin to use Spline 3D Addon' ), '<a href="https://wordpress.org/plugins/greenshift-animation-and-page-builder-blocks" target="_blank">Greenshift</a>' ) ; ?></p>
	</div>
	<?php
}