function skillgen(data){
  var skills = data;
  var result = {
    nodes: [],
    links: []
  };

  result.nodes = skills.map(function (v) {
    var y = 230;
    v.fixed = true;

    switch (v.cost) {
      case 1:
        v.x = 80;
        break;
      case 2:
        v.x = 260;
        break;
      case 3:
        v.x = 460;
        break;
      case 4:
        v.x = 660;
        break;
      case 5:
        v.x = 860;
        break;
      case 6:
        v.x = 1060;
        break;
    }
    switch (v.row) {
      case 1:
        v.y = y-170;
        break;
      case 2:
        v.y = y-80;
        break;
      case 3:
        v.y = y;
        break;
      case 4:
        v.y = y+80;
        break;
      case 5:
        v.y = y+170;
        break;
    }

    return v;
  });

  // result.links = skills.map(function(v){
  //   if(!v.parent){
  //
  //   }
  //   return {source:  }
  // });

  skills.forEach(function(v){
    if(v.parents){
      var lineColor = false;
      for (var i = 0; i < v.parents.length; i++) {
        var source = getIndex(v.id);
        var target = getIndex(v.parents[i]);
        var parent = getSkillById(v.parents[i]);
        if(v.can_take && parent.can_take){
          lineColor = true;
        }else{
          lineColor = false;
        }
        result.links.push({source: source, target: target, lineColor});
      }
    }
  });

  function getSkillById(id){
    var res;

    skills.forEach(function(v){
      if(v.id === id){
        res = v;
      }
    });

    return res;
  }

  function getIndex(id){
    var res
    result.nodes.forEach(function(v, i){
      if(v.id === id){
        res = i;
      }
    });
    return res;
  }

  return result;
}



function lin(items) {
  items.forEach(function(v, i){

  });
}

function foo(v){
  if(!v.parents){
    v.x = 1;
    v.y = 2;
    return v
  }
}
