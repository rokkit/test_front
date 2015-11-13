define(function(require) {
  'use strict';
  var Desktop, Handlebars, Listener, Marionette, Routes, app;
  Marionette = require('marionette');
  Routes = require('app/routes');
  Desktop = require('controllers/desktop');
  Handlebars = require('handlebars');
  Listener = require('utils/listener');
  require('system/helpers');
  require('rivets');
  require('backbone.rivets');
  app = new Marionette.Application({
    debug: true,
    regions: {
      regionContent: '#region-content',
      regionHeader: '#region-header',
      regionLogin: '#region-login'
    },
    initialize: function() {
      if (this.debug) {
        console.log('app/app : initializing app');
      }
      this.utils = {};
      return this.utils.Listener = new Listener({});
    },
    preload: function() {
      if (this.debug) {
        console.log('app/app : preload function ');
      }
      this.appRouter = new Routes({
        controller: new Desktop()
      });
      return Backbone.history.start();
    },
    Rivets: rivets
  });
  app.addInitializer(function(options) {
    return this.preload();
  });
  app.regionContent.on('show', function() {
    removeClass(app.regionContent.el, 'fadeout');
    return addClass(app.regionContent.el, 'fadein');
  });
  app.regionHeader.on('show', function() {
    removeClass(app.regionHeader.el, 'fadeout');
    return addClass(app.regionHeader.el, 'fadein');
  });
  Marionette.Behaviors.behaviorsLookup = function() {
    return window.Behaviors;
  };
  Marionette.Renderer.render = function(template, data) {
    var toHTML;
    toHTML = Handlebars.compile(template);
    return toHTML(data);
  };
  return app;
});
