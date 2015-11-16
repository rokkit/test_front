'use strict';

import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
	el 			: 'body' 	,
	template 	: template 	,
	className 	: 'page'
});