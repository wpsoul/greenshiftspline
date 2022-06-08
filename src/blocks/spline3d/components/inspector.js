/**
 *
 * Inspector Component.
 *
 */

// Import wp dependencies
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';

import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	BaseControl,

} from '@wordpress/components';

// Import blockypage dependencies
const {
	Spacing,
	Responsive,
	CssTransform,
	Position,
	Animation,
	Background,
} = gspblib.collections;

const { InspectorTabs, InspectorTab, CssUnits, Devices } = gspblib.components;
const { gspb_getDeviceStateIndex } = gspblib.utilities;

const Inspector = (props) => {

	const {
		attributes: {
			url,
			threecanvwidth,
			threecanvheight,
			threecanvheightUnit,
			threecanvwidthUnit,
			align,
			td_load_iter
		},
		setAttributes,
	} = props;

	const ALIGNMENT_CONTROLS = [
		{
			icon: 'editor-alignleft',
			title: __('Align Text Left'),
			align: 'flex-start',
		},
		{
			icon: 'editor-aligncenter',
			title: __('Align Text Center'),
			align: 'center',
		},
		{
			icon: 'editor-alignright',
			title: __('Align Text Right'),
			align: 'flex-end',
		},
	];

	const deviceStateIndex = gspb_getDeviceStateIndex();
	const [devstate, setdevState] = useState(0);

	return (
		<>
			<InspectorControls>
				<div className="gspb_inspector">
					<InspectorTabs tabs={['general', 'advance']}>
						<InspectorTab key={'general'}>
							<PanelBody
								initialOpen={true}
								title={__('Loader')}
							>
								<BaseControl help={__('You can get url when you do Export - Code - React - URL')}>

									<TextControl
										label={__('React URL')}
										value={url}
										onChange={(value) => {
											setAttributes({
												url: value
											});
										}}
									/>
								</BaseControl>
								<ToggleControl
									label={__('Load only on iteraction')}
									checked={td_load_iter}
									onChange={(value) => {
										setAttributes({ td_load_iter: value });
									}}
								/>
							</PanelBody>
							<PanelBody title={__("Canvas Size")} initialOpen={false}>
								<div className="gspb_inspector_options-set" style={{ marginBottom: 15 }}>
									<div className="gspb_row gspb_row--no-padding-col">
										<div className="gspb_row__col--7">
											<span className="gspb_inspector_property-title">
												{__('Width')}
												<Devices
													className="gspb_inspector_device-icons--small"
													onChange={() =>
														setdevState(!devstate)
													}
												/>
											</span>
										</div>
										<div
											className="gspb_row__col--5"
											style={{
												justifyContent: 'space-between',
											}}
										>
											<div>

												<CssUnits
													units={['px', '%']}
													attribute={
														threecanvwidthUnit[deviceStateIndex] ==
															null
															? ''
															: threecanvwidthUnit[deviceStateIndex]
													}
													onChange={(value) => {
														let currentValue = threecanvwidthUnit.slice();
														currentValue[
															deviceStateIndex
														] = value;
														setAttributes({
															threecanvwidthUnit: currentValue,
														});
													}}
												/>
												<div
													className="gspb_inspector_clear_btn--right"
													onClick={() => {
														let currentValue = threecanvwidth.slice();
														currentValue[
															deviceStateIndex
														] = null;
														setAttributes({
															threecanvwidth: currentValue,
														});
													}}
												>
													<i className="rhicon rhi-undo" />
												</div>
											</div>
										</div>
										<div style={{ width: '100%' }}>
											<RangeControl
												value={
													threecanvwidth[deviceStateIndex] == null
														? ''
														: threecanvwidth[deviceStateIndex]
												}
												onChange={(value) => {
													let currentValue = threecanvwidth.slice();
													currentValue[
														deviceStateIndex
													] = value;
													setAttributes({
														threecanvwidth: currentValue,
													});
												}}
												trackColor='#2184f9'
												min={
													threecanvwidthUnit[deviceStateIndex] ==
														'px'
														? 100
														: 1
												}
												max={
													threecanvwidthUnit[deviceStateIndex] ==
														'px'
														? 2500
														: 100
												}
											/>
										</div>
									</div>
								</div>
								<div className="gspb_inspector_options-set" style={{ marginBottom: 15 }}>
									<div className="gspb_row gspb_row--no-padding-col">
										<div className="gspb_row__col--7">
											<span className="gspb_inspector_property-title">
												{__('Height')}
												<Devices
													className="gspb_inspector_device-icons--small"
													onChange={() =>
														setdevState(!devstate)
													}
												/>
											</span>
										</div>
										<div
											className="gspb_row__col--5"
											style={{
												justifyContent: 'space-between',
											}}
										>
											<div>

												<CssUnits
													units={['px', '%']}
													attribute={
														threecanvheightUnit[deviceStateIndex] ==
															null
															? ''
															: threecanvheightUnit[deviceStateIndex]
													}
													onChange={(value) => {
														let currentValue = threecanvheightUnit.slice();
														currentValue[
															deviceStateIndex
														] = value;
														setAttributes({
															threecanvheightUnit: currentValue,
														});
													}}
												/>
												<div
													className="gspb_inspector_clear_btn--right"
													onClick={() => {
														let currentValue = threecanvheight.slice();
														currentValue[
															deviceStateIndex
														] = null;
														setAttributes({
															threecanvheight: currentValue,
														});
													}}
												>
													<i className="rhicon rhi-undo" />
												</div>
											</div>
										</div>
										<div style={{ width: '100%' }}>
											<RangeControl
												value={
													threecanvheight[deviceStateIndex] == null
														? ''
														: threecanvheight[deviceStateIndex]
												}
												onChange={(value) => {
													let currentValue = threecanvheight.slice();
													currentValue[
														deviceStateIndex
													] = value;
													setAttributes({
														threecanvheight: currentValue,
													});
												}}
												trackColor='#2184f9'
												min={
													threecanvheightUnit[deviceStateIndex] ==
														'px'
														? 100
														: 1
												}
												max={
													threecanvheightUnit[deviceStateIndex] ==
														'px'
														? 2500
														: 100
												}
											/>
										</div>
									</div>
								</div>
							</PanelBody>

							{ /* Background Settings */}
							<PanelBody
								title={__("Background and Opacity")}
								initialOpen={false}
								className="gspb_inspector"
							>
								<Background
									attributeName="background"
									exclude={['video']}
									{...props}
								/>
							</PanelBody>
							{ /* Spacing */}
							<PanelBody title={__("Spacing")} initialOpen={false}>
								<Spacing attributeName="spacing" overflow={false} {...props} />
							</PanelBody>

						</InspectorTab>
						<InspectorTab key={'advance'}>
							{ /* Animations Tab */}
							<PanelBody title={__("Animation")} initialOpen={true}>
								<Animation
									attributeName="animation"
									{...props}
								/>
							</PanelBody>

							{ /* Css Transform */}
							<PanelBody title={__("Css Transform")} initialOpen={false}>
								<CssTransform attributeName="csstransform" {...props} />
							</PanelBody>

							{ /* Position Tab */}
							<PanelBody title={__("Position")} initialOpen={false}>
								<Position attributeName="position" {...props} />
							</PanelBody>
							{ /* Responsive */}
							<PanelBody title={__("Responsive and Custom Css", "greenshift")} initialOpen={false}>
								<Responsive attributeName="responsive" {...props} />
							</PanelBody>
						</InspectorTab>
					</InspectorTabs>
				</div>

			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={align}
					onChange={align => setAttributes({ align })}
					alignmentControls={ALIGNMENT_CONTROLS}
				/>
			</BlockControls>
		</>
	);
}

export default Inspector;

const DocLink = () => {
	return (
		<>
			<a href="https://modelviewer.dev/examples/stagingandcameras/#orbitAndScroll" target="_blank">Documentation</a>
		</>
	)
}