import {Route} from 'backbone-routing';
import View from 'community/view';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  render() {
    this.view = new View();
    this.view.render();
  }
});