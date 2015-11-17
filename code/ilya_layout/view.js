import {ItemView} from 'backbone.marionette';
import Haml from 'haml';
import tpl from 'index/test.haml';

export default ItemView.extend({
  template: Haml(tpl),
  className: 'page',
});