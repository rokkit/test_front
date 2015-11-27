var ui;

(function () {
	"use strict";
	var that = this;
	ui = {
		app: {},
		view: {},
		init: function () {
			//this.app = angular.module('uk',['ngRoute']);
		},
	}

	window.ui = $.extend({}, window.ui, ui);
	ui.init();
})();
