import {LayoutView} from 'backbone.marionette';
import template from './layout.hbs';

export default LayoutView.extend({
	el: 'body',
	template: template,

	regions: {
		regionContent : 'main'
	}
});