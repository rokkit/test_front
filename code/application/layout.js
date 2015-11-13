import {LayoutView} from 'backbone.marionette';
import template from 'application/layout.hbs';

export default LayoutView.extend({
	el: 'body',
	template: template,

	regions: {
		view : 'body'
	}
});