define(function(require) {
  'use strict';
  var Marionette, Template, View;
  Marionette = require('marionette');
  Template = require('text!tmpls/parts/login/login.html');
  View = Marionette.ItemView.extend({
    template: Template,
    ui: {
      'linkRegistrate': '.js-link-registrate'
    },
    events: {
      'click @ui.linkRegistrate': 'showRegistrate'
    },
    initialize: function() {
      this.on('showLogin', this.showLogin, this);
      this.on('hideLogin', this.hideLogin, this);
      return this.on('render', this.afterRender, this);
    },
    afterRender: function() {
      var sectionElement;
      sectionElement = this.el.querySelectorAll('section');
      return this.showBlockLogin = TweenMax.to(sectionElement, 1, {
        right: '0%'
      }).paused(true);
    },
    showLogin: function() {
      return this.showBlockLogin.play();
    },
    hideLogin: function() {
      return this.showBlockLogin.reverse();
    },
    showRegistrate: function() {
      return console.log('Show registrate');
    }
  });
  return View;
});
