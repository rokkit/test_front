define(function(require) {
  'use strict';
  var Marionette, Template;
  Marionette = require('marionette');
  Template = require('text!tmpls/parts/header/header.html');
  require('gsap');
  return Marionette.ItemView.extend({
    debug: true,
    template: Template,
    ui: {
      'linkRegistration': '.js-link-registration',
      'linkLogin': '.js-link-login'
    },
    events: {
      'click @ui.linkLogin': 'showLogin'
    },
    initialize: function() {
      return this.on('render', this.afterRender, this);
    },
    afterRender: function() {
      this.scaleBody = document.getElementById('scale-body');
      this.scaleClass = 'scale-element';
      this.scaleAnimation = TweenMax.to(this.scaleBody, 1, {
        className: this.scaleClass
      }).paused(true);
      return app.utils.Listener.setClosest({
        id: 'clossetOutLogin',
        title: 'Клик вне логин формы',
        selector: this.scaleBody,
        callbackOnElement: (function(_this) {
          return function() {
            app.regionLogin.currentView.trigger('hideLogin');
            return _this.scaleAnimation.reverse();
          };
        })(this)
      });
    },
    showLogin: function() {
      if (this.debug) {
        console.log('views/parts/header/header.showLogin : debug');
      }
      app.regionLogin.currentView.trigger('showLogin');
      return this.scaleAnimation.play();
    }
  });
});
