function skillgen(data){
  var skills = data;
  var layoutWidth = $('#skill-view').width();
  var layoutHeight = $('#skill-view').height();
  var dx = layoutWidth/6; //200;
  var dy = layoutHeight/5 - 55; //75;
  var margin = {
    top: layoutHeight * 0.06,
    left: 100
  };

  var result = {
    nodes: [],
    links: [],
    skillCount: 0
  };

  result.skillCount = data.length;
  result.nodes = skills.map(function (v) {
    v.fixed = true;
    v.x = v.cost * dx - dx + margin.left;
    v.y = v.row * dy - dy + margin.top;
    return v;
  });

  skills.forEach(function(v){
    if(v.parents){
      var lineColor = false;
      for (var i = 0; i < v.parents.length; i++) {
        var source = getIndex(v.id);
        var target = getIndex(v.parents[i]);
        var parent = getSkillById(v.parents[i]);
        console.log(v)
        if(parent.has && v.has){
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
