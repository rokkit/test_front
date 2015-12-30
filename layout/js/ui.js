var ui;
(function () {
  'use strict';
  var that = this;
  ui = {
    app: {},
    view: {},
    init: function () {
    }
  };
  window.ui = $.extend({}, window.ui, ui);
  ui.init();
}());