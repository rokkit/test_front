require(['app/app', 'pace'], function(app, pace) {
  'use strict';
  var loader;
  window.addClass = function(el, className) {
    if (el.classList) {
      return el.classList.add(className);
    } else {
      return el.className += ' ' + className;
    }
  };
  window.removeClass = function(el, className) {
    var reg;
    if (el.classList) {
      return el.classList.remove(className);
    } else {
      reg = new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');
      return el.className = el.className.replace(reg, ' ');
    }
  };
  window.app = app || false;
  loader = document.getElementById('loader');
  loader.addEventListener('webkitAnimationEnd', function(event) {
    console.log('Animation end!!!!');
    if (loader.style.display !== 'none') {
      loader.style.display = 'none';
    }
    return app.start();
  }, false);
  pace.on('start', function() {
    if (app.debug) {
      return console.log('Pace start');
    }
  });
  pace.on('done', function() {
    if (app.debug) {
      console.log('Pace done');
    }
    addClass(loader, 'fadeout');
    return removeClass(loader, 'fadein-loader');
  });
  return pace.start({
    document: false
  });
});
