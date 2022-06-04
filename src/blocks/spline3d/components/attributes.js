/**
 * Set the block attributes
 * @type {Object}
 */
const { collectionsObjects } = gspblib.helpers;
export default {
	id: {
		type: 'string',
		default: null,
	},
	inlineCssStyles: {
		type: 'string',
	},
	url: {
		type: 'string',
	},
	threecanvwidth : {
		type: 'array',
		default: [100, null, null, null]
	},
	threecanvheight : {
		type: 'array',
		default: [250, null, null, null]
	},	
	threecanvwidthUnit : {
		type: 'array',
		default: ['%', '%', '%', '%']
	},
	threecanvheightUnit : {
		type: 'array',
		default: ['px', 'px', 'px', 'px']
	},
	align: {
		type: 'string'
	},
	background: {
		type: 'object',
		default: collectionsObjects.background,
	},
	spacing: {
		type: 'object',
		default: collectionsObjects.spacing,
	},
	animation: {
		type: 'object',
		default: collectionsObjects.animation,
	},
	responsive: {
		type: 'object',
		default: collectionsObjects.responsive
    },
	position: {
		type: 'object',
		default: collectionsObjects.position,
	},
	csstransform: {
		type: 'object',
		default: collectionsObjects.csstransform,
	},
	td_load_iter:{
		type: 'boolean',
	},
};
