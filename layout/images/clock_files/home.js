define(function(require) {
  'use strict';
  var Marionette, Template;
  Marionette = require('marionette');
  Template = require('text!tmpls/views/pages/home/home.tpl');
  require('gsap');
  return Marionette.ItemView.extend({
    debug: true,
    template: Template,
    initialize: function() {
      if (this.debug) {
        console.log('pages/home/home.initialize');
      }
      return this.on('render', this.afterRender, this);
    },
    afterRender: function() {
      if (this.debug) {
        console.log('page/home/home.afterRender');
      }
      return this.initCardsAnimation();
    },
    initCardsAnimation: function() {
      var elements;
      CSSPlugin.defaultTransformPerspective = 1000;
      elements = this.el.querySelectorAll('.lounge');
      return Array.prototype.forEach.call(elements, function(el, i) {
        return el.addEventListener('click', function() {
          var backCard, frontCard, tl;
          backCard = el.querySelector('.backside');
          frontCard = el.querySelector('.frontside');
          TweenMax.set(backCard, {
            rotationY: -180
          });
          tl = new TimelineMax({
            paused: true
          });
          tl.to(frontCard, 1, {
            rotationY: 180
          }, 0).to(backCard, 1, {
            rotationY: 0
          }, 0).to(el, .5, {
            z: 200
          }, 0);
          el.animation = tl;
          return el.animation.play();
        }, false);
      });
    }
  });
});
