import {Router} from 'backbone-routing';
import IndexRoute from './index/route';
import MainRoute from './main/route';


export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  routes: {
    '': 'main'
  },

  index() {
    return new IndexRoute({
      container: this.container
    });
  },

  main(){
    return new MainRoute({
      container: this.container
    });
  }
});
