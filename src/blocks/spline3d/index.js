/**
 * Icon box Block
 */

// Import Styles
import './editor.scss';

// Import wp dependencies
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
import { useEffect, useRef } from '@wordpress/element';

// Import block dependencies
import attributes from './components/attributes';
import ModelBox from './components/ModelBox';
import Inspector from './components/inspector';
import blockIcon from './components/icon';

// Import blpge depenedencies
const { gspb_setBlockId } = gspblib.utilities;
const { BlockToolBar } = gspblib.components;
const { AnimationWrapper } = gspblib.collections;

// Register Block
registerBlockType('greenshift-blocks/spline3d', {
	title: __('Spline 3d Loader'),
	description: __('Smart loader for spline 3d models'),
	icon: blockIcon,
	category: 'greenShiftSpline',
	keywords: [__('3d'), __('spline3d'), __('greenshift')],
	supports: {
		align: ['wide', 'full']
	}, 

	// Define attributes
	attributes: attributes,

	edit(props) {
		const {
			attributes: {
				url,
			}
		} = props;
		// Generate Unique ID for The Block
		gspb_setBlockId(props);

		const ModelRef = useRef();

		return [
			// Include Inspector
			<Inspector {...props} />,
			<BlockToolBar {...props} />,
			<>
				<AnimationWrapper attributes={attributes} props={props}>
					<div ref={ModelRef}>
						<ModelBox editor={true} {...props} />
					</div>
				</AnimationWrapper>
			</>
		];
	},

	save(props) {
		// Save container
		return null;
	},
});
