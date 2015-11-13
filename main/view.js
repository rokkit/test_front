import {ItemView} from 'backbone.marionette';
import Haml from 'haml';
import template from 'main/template.hbs';
import template1 from 'main/test.haml';

export default ItemView.extend({
  template: Haml(template1),
  className: 'page',
});