requirejs.config({
  'paths': {
    'requirejs': 'bower_components/requirejs/require',
    'text': 'bower_components/requirejs-text/text',
    'i18n': 'bower_components/requirejs-i18n/i18n',
    'jquery': 'bower_components/jquery/dist/jquery.min',
    'underscore': 'bower_components/underscore/underscore-min',
    'backbone': 'bower_components/backbone/backbone-min',
    'backbone.babysitter': 'bower_components/backbone.babysitter/lib/backbone.babysitter.min',
    'backbone.wreqr': 'bower_components/backbone.wreqr/lib/backbone.wreqr.min',
    'backbone.deep-model': 'bower_components/backbone-deep-model/distribution/deep-model.min',
    'backbone.rivets': 'bower_components/rivets-backbone-adapter/rivets-backbone',
    'marionette': 'bower_components/marionette/lib/core/backbone.marionette.min',
    'marionette.component': 'bower_components/marionette.component/dist/marionette.component.min',
    'handlebars': 'bower_components/handlebars/handlebars.min',
    'rivets': 'bower_components/rivets/dist/rivets',
    'sightglass': 'bower_components/sightglass/index',
    'backbone-validation': 'bower_components/backbone-validation/dist/backbone-validation-min',
    'gsap': 'bower_components/gsap/src/minified/TweenMax.min',
    'app': 'src/js/app',
    'nls': 'src/js/app/nls',
    'utils': 'src/js/app/utils',
    'tmpls': 'src/js/app/templates',
    'views': 'src/js/app/views',
    'models': 'src/js/app/models',
    'system': 'src/js/app/system',
    'components': 'src/js/app/components',
    'controllers': 'src/js/app/controllers',
    'collections': 'src/js/app/collections',
    'widgets': 'src/js/app/widgets',
    'pace': 'bower_components/pace/pace.min',
    'spec': 'src/js/app/tests/spec',
    'sinon': 'bower_components/sinonjs/sinon',
    'jasmine': 'bower_components/jasmine/lib/jasmine-core/jasmine',
    'jasmine-html': 'bower_components/jasmine/lib/jasmine-core/jasmine-html',
    'jasmine-ajax': 'bower_components/jasmine-ajax/lib/mock-ajax',
    'jasmine-sinon': 'bower_components/jasmine-sinon/lib/jasmine-sinon',
    'jasmine-jquery': 'bower_components/jasmine-jquery/lib/jasmine-jquery',
    'boot': 'bower_components/jasmine/lib/jasmine-core/boot'
  },
  'shim': {
    'jquery': {
      'exports': '$'
    },
    'underscore': {
      'exports': '_'
    },
    'handlebars': {
      'exports': 'Handlebars'
    },
    'backbone': {
      'exports': 'Backbone',
      'deps': ['jquery', 'underscore']
    },
    'marionette': {
      'exports': 'Marionette',
      'deps': ['jquery', 'underscore', 'backbone', 'backbone.babysitter', 'backbone.wreqr']
    },
    'marionette.component': {
      'deps': ['marionette']
    },
    'backbone.deep-model': {
      'deps': ['jquery', 'backbone', 'underscore']
    },
    'rivets': {
      'deps': ['sightglass']
    },
    'backbone.rivets': {
      'deps': ['backbone', 'rivets']
    },
    'backbone-validation': {
      'deps': ['jquery', 'backbone']
    },
    'bootstrap': {
      'deps': ['jquery']
    },
    'pace': {
      'deps': ['jquery']
    },
    'jasmine': {
      'exports': 'window.jasmineRequire'
    },
    'jasmine-html': {
      'deps': ['jasmine'],
      'exports': 'jasmine-html'
    },
    'jasmine-sinon': {
      'deps': ['jasmine', 'boot', 'sinon'],
      'exports': 'jasmine-sinon'
    },
    'jasmine-jquery': {
      'deps': ['jasmine', 'boot', 'jquery'],
      'exports': 'jasmine-jquery'
    },
    'boot': {
      'deps': ['jasmine', 'jasmine-html'],
      'exports': 'boot'
    }
  },
  config: {
    i18n: {
      locale: 'ru-ru'
    }
  }
});
