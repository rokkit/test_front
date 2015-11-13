import {Router} from 'backbone-routing';
import MainRoute from './main/route';


export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  routes: {
    '': 'main'
  },

  main(){
    return new MainRoute({
      container: this.container
    });
  }
});
