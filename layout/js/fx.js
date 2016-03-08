var FX = function (animations) {
  console.log(animations);
  var defaultTime = animations.defaultTime;
  var module = {
    animations: {},
    animate: {},
    tl: []
  };
  module.init = function () {
    for (var index in animations) {
      if (animations.hasOwnProperty(index)) {
        module.animations[index] = animations[index];
      }
    }
  };
  module.do = function (arg, cb, rc) {
    if (arg instanceof Array) {
      module.tl.push(arg);
      var last = arg[arg.length - 1];
      arg.forEach(function (name) {
        if (name in module.animations) {
          var callback = null;
          var rC = null;
          if (last === name) {
            callback = cb;
            rC = rc;
          }
          render(name, callback, rC);
        }
      });
    }
  };
  module.swap = function (targetName, name) {
    var param = module.tl;
    var targetItem = module.animations[targetName];
    if ('back' in targetItem) {
      renderBack(targetName);
    } else {
      module.animate[targetName].reverse();
    }
    param.forEach(function (v) {
      var i = v.indexOf(targetName);
      if (i != -1) {
        v[i] = name;
        render(name);
      }
    });
  };
  function renderBack(name) {
    var item = module.animations[name];
    TweenLite.to(item.element, 1, item.back, 'normal');
  }
  module.back = function (name) {
    var param = module.tl.pop();
    param.forEach(function (name) {
      var targetItem = module.animations[name];
      if ('back' in targetItem) {
        renderBack(name);
      } else {
        module.animate[name].reverse();
      }
    });
    if (module.tl.length === 0) {
      module.animate = {};
    }
  };
  function render(name, cb, rc) {
    var item = module.animations[name];
    module.animate[name] = new TimelineLite({
      onComplete: cb,
      onReverseComplete: rc
    });
    if (item instanceof Array) {
      item.forEach(function (it) {
        var anim = module.animations[it];
        var time = anim.time !== undefined ? anim.time : defaultTime;
        module.animate[name].to(anim.element, time, anim.options, 'normal');
      });
    } else {
      var time = item.time !== undefined ? item.time : defaultTime;
      module.animate[name].to(item.element, time, item.options, 'normal');
    }
  }
  module.init();
  return module;
};
