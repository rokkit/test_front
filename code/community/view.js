import {LayoutView} from 'backbone.marionette';
import CommunityLayoutview from 'community/community-layoutview.hbs';

export default LayoutView.extend({
	el : 'body',
	template: CommunityLayoutview
});