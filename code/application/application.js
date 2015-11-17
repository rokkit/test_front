import $ from 'jquery';
import _ from 'lodash';
import Radio from 'backbone.radio';
import {Application} from 'backbone.marionette';
import LayoutView from 'application/layout';

let routerChannel = Radio.channel('router');

export default Application.extend({
  regions : {
    regionMain : 'body'
  } ,

  initialize() {
    this.$body = $(document.body);

    this.listenTo(routerChannel, {
      'before:enter:route' : this.onBeforeEnterRoute,
      'enter:route'        : this.onEnterRoute,
      'error:route'        : this.onErrorRoute
    });

    window.Behaviors = {}
  },

  onBeforeEnterRoute() {
    this.transitioning = true;
    _.defer(() => {
      if (this.transitioning) {
        nprogress.start();
      }
    });
  },

  onEnterRoute() {
    this.transitioning = false;
    this.$body.scrollTop(0);
    nprogress.done();
  },

  onErrorRoute() {
    this.transitioning = false;
    nprogress.done(true);
  }
});

/**
  * this.layout = new LayoutView();
  * this.layout.render(); 
 */