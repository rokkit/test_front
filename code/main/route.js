import {Route} from 'backbone-routing';
import View from 'main/main_view';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.render();
  },

  render() {
    this.view = new View();
    this.container.show(this.view);
  }
});