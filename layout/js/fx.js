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

  module.do = function(arg){
    if(arg instanceof Array){
      module.tl.push(arg);
      arg.forEach(function(name){
        if(name in module.animations){
          render(name);
        }
      });
    }
  }

  module.back = function(){
    var param = module.tl.pop();
    param.forEach(function(name){
      module.animate[name].reverse();
    });
  }

  function render(name){
    var item = module.animations[name];
    module.animate[name] = new TimelineLite();
    if(item instanceof Array){
      item.forEach(function(it){
        var anim = module.animations[it];
        module.animate[name].to(anim.element, 1, anim.options, 'normal');
      });
    } else {
      module.animate[name].to(item.element, 1, item.options, 'normal');
    }
  }


  module.init();
  return module;
});
