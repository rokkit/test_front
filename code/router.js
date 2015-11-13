import {Router}         from 'backbone-routing';
import IndexRoute       from 'index/route';
import MainRoute        from 'main/route';
import PhilosophyRoute  from 'philosophy/route'

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  routes: {
    ''            : 'main',
    'index': 'index',
    'philosophy'  : 'philosophy'
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
  } ,

  philosophy(){
    return new PhilosophyRoute({
      container: this.container
    });
  }
});
