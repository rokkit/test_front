import './plugins';
import Backbone from 'backbone';
import $ from 'jquery';

import Application from './application/application';

import IndexRouter from './index/router';

let app = new Application();

app.index = new IndexRouter({
  container: app.layout.content
});

Backbone.history.start();