//import './plugins';
import Backbone from 'backbone';
import $ from 'jquery';

import Application from './application/application';

import Router from './router';

let app = new Application();

app.router = new Router({
  container: app.layout.regionContent
});

Backbone.history.start();