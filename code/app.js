import Backbone from 'backbone';
import $ from 'jquery';

import Application from 'application';

import Router from 'router';

let app = new Application();

app.router = new Router({
  container: app.regionMain
});



Backbone.history.start();