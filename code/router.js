import {Router}         from 'backbone-routing';
import MainRoute        from 'main/route';
import PhilosophyRoute  from 'philosophy/route';
import Community from 'community';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.community = new Community(this.container);
  },

  routes: {
    '': 'main',
    'community': 'community',
    'philosophy': 'philosophy'
  },

  main(){
    return new MainRoute({
      container: this.container
    });
  },

  community(){
    return this.community.route();
  },

  philosophy(){
    return new PhilosophyRoute({
      container: this.container
    });
  }
});
