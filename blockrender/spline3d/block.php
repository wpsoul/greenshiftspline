<?php

namespace Greenshift\Blocks;
defined('ABSPATH') OR exit;

class Spline3d{

	public function __construct(){
		add_action('init', array( $this, 'init_handler' ));
	}

	public function init_handler(){
		register_block_type(__DIR__, array(
                'render_callback' => array( $this, 'render_block' ),
                'attributes'      => $this->attributes
            )
		);
	}

	public $attributes = array(
		'id' => array(
			'type'    => 'string',
			'default' => null,
		),
		'inlineCssStyles' => array(
			'type'    => 'string',
			'default' => '',
		),
		'animation' => array(
			'type' => 'object',
			'default' => array(),
		),
        'url' => array(
			'type'    => 'string',
			'default' => '',
		),
 
	);


	public function render_block($settings = array(), $inner_content=''){
		extract($settings);

		$blockId = 'gspbsplineBox-id-'.$id;
		$blockClassName = 'gspb-spline-loader '.$blockId.' '.(!empty($className) ? $className : '').' ';

		$out = '<div id="'.$blockId.'" class="'.$blockClassName.'"'.gspb_AnimationRenderProps($animation).'>';
            $out .='<canvas width="100%" height="100%" data-url="'.$url.'"></canvas>';
            $out .='    
            <script type="module">
            import { Application } from "'.GREENSHIFTSPLINE_DIR_URL . 'libs/spline3d/runtime.js";
            const canvas = document.getElementById("'.$blockId.'");
            const canvasobj = canvas.querySelector("canvas");
            const url = "'.$url.'";
            const app = new Application(canvasobj);
            app.load(url);
          </script>';
        $out .='</div>';
		return $out;
	}
}

new Spline3d;