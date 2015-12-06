var FX = (function(animations){
  var module = {
    animations: {},
    animate: {},
    tl: []
  };

  module.init = function(){
    for(var index in animations) {
      if (animations.hasOwnProperty(index)) {
        module.animations[index] = animations[index];
      }
    }
  };

  module.do = function(arg, cb, rc){
    if(arg instanceof Array){
      module.tl.push(arg);
      var last = arg[arg.length - 1];
      arg.forEach(function(name){
        if(name in module.animations){
          var callback = null;
          var rC = null;

          if(last === name){
            callback = cb;
            rC = rc;
          }

          render(name, callback, rC);
        }
      });
    }
  }

  module.swap = function(targetName, name){
    var param = module.tl;
    module.animate[targetName].reverse();
    param.forEach(function(v){
      var i = v.indexOf(targetName);
      if(i != -1) {
        v[i] = name;
        render(name);
      }
    });
  }

  module.back = function(name){
    var param = module.tl.pop();
    param.forEach(function(name){
      module.animate[name].reverse();
    });
  }

  function render(name, cb, rc){
    var item = module.animations[name];
    module.animate[name] = new TimelineLite({onComplete: cb, onReverseComplete: rc});
    if(item instanceof Array){
      item.forEach(function(it){
        var anim = module.animations[it];
        module.animate[name].to(
          anim.element,
          1,
          anim.options,
          'normal'
        );
      });
    } else {
      module.animate[name].to(
        item.element,
        1,
        item.options,
        'normal'
      );
    }
  }


  module.init();
  return module;
});
