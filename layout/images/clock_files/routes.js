define(function(require) {
  'use strict';
  var Marionette;
  Marionette = require('marionette');
  return Backbone.Marionette.AppRouter.extend({
    debug: true,
    initialize: function() {
      return console.log('app/routes.initialize()');
    },
    appRoutes: {
      '': 'Home'
    }
  });
});
