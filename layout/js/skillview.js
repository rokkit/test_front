var currentUser = JSON.parse(localStorage.getItem('currentUser'));
var sf;
$(function(){
  $.getJSON(
    'http://176.112.194.149:81' + '/api/v1/skills.json',
    {auth_token: currentUser.auth_token, role: 'user'},
    function(json) {
      sf = skillgen(json);
      var layoutWidth = $('#skill-view').width();
      var layoutHeight = $('#skill-view').height();

      var layout = d3.select('#skill-view').append('svg')
      .attr('width', layoutWidth)
      .attr('height', layoutHeight);



      var y = 230;//layoutHeight/2;
      var dx = 6;
      var x0 = 75;

      // var nodes = [
      //   {id: 0, x:x0 + 10 * dx, y:y, fixed: true},
      //   {id: 1, x:x0 + 60 * dx, y:y, fixed: true},
      //   {id: 2, x:x0 + 110 * dx, y:y, fixed: true},
      //   {id: 3, x:x0 + 160 * dx, y:y, fixed: true},
      //   {id: 4, x:x0 + 210 * dx, y:y, fixed: true},
      //   {id: 5, x:x0 + 260 * dx, y:y, fixed: true},
      // ];
      //
      // var n = [
      //   {id: 0, x: 60, y:y, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
      //   {id: 1, x: 260, y:y-80, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
      //   {id: 2, x: 260, y:y+80, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
      //   {id: 3, x: 460, y:y-80, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
      //   {id: 4, x: 460, y:y+80, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
      //   {id: 5, x: 660, y:y-170, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
      //   {id: 6, x: 660, y:y, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
      //   {id: 7, x: 660, y:y+170, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
      //   {id: 8, x: 860, y:y-80, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
      //   {id: 9, x: 860, y:y+80, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
      //   {id: 10, x: 1060, y:y, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
      // ];

      //var sf = skillgen(skilldata);

      var force = d3.layout.force()
      .size([layoutWidth, layoutHeight])
      .nodes(sf.nodes)
      .links(sf.links)
      // .linkStrength(15)
      // .linkDistance(600)
      // .gravity(0)
      .on('tick', tick);

      function tick() {
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            //link.attr('transform', function(d){ return "translate(" + d.x + "," + d.y + ")";});
            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
            link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });


      }

      var node = layout.selectAll('.node');
      var link = layout.selectAll('.link');

      node = node.data(force.nodes());
      link = link.data(force.links());

      node.enter().append("g").attr("class", "node");
      link.enter().insert("line", ".node").attr("class", "link");
      //link.enter().append("g", '.node').attr("class", "link");

      // var defs = node.append('svg:defs');
      // defs.append("svg:pattern")
      // .attr("id", "grump_avatar")
      // .attr("width", 80)
      // .attr("height", 80)
      // .attr("patternUnits", "userSpaceOnUse")
      // .append("svg:image")
      // .attr("xlink:href", function(v){
      //   return 'http://176.112.194.149:81'+v.image;
      // })
      // .attr("width", 80)
      // .attr("height", 80)
      // .attr("x", 0)
      // .attr("y", 0);

      // define the clipPath
link.append("mask")       // define a clip path
    .attr("id", "ellipse-clip") // give the clipPath an ID
    .append("circle")          // shape it as an ellipse
    .attr("x", 10)         // position the x-centre
    .attr("y", 10)         // position the y-centre
    .attr("r", 40);         // set the y radius

link.attr("mask", "url(#ellipse-clip)");

      // link.append('circle')
      // .attr('x', 10)
      // .attr('y', 10)
      // .attr('r', 40);

      node.append("image")
          .attr("xlink:href", function(v){
            return 'http://176.112.194.149:81'+v.image;
          })
          //.attr("clip-path", "url(#ellipse-clip)")
          .attr("x", -40)
          .attr("y", -40)
          .attr("width", 80)
          .attr("height", 80);

      node.append('text')
      .text(function(e){
        return e.name;
      })
      .attr('fill', 'rgba(255,255,255,255)')
      .attr('x', -30)
      .attr('y', 55)
      .attr("font-size", 10)
      .attr('letter-spacing', 0.5)
      .attr("font-family", "normal normal 300 18px Bebas Neue Book");

      node.append('text')
      .text(function(e){
        return e.date;
      })
      .attr('fill', 'rgba(255,255,255,0.3)')
      .attr('x', -16)
      .attr('y', 68)
      .attr("font-size", 8)
      .attr('letter-spacing', 0.5)
      .attr("font-family", "normal normal 300 18px Bebas Neue Book");

      for (var i = 1; i < 7; i++) {
        layout.append('text')
        .text(i)
        .attr('fill', '#F2AE32')
        .attr('x', 200 * i-90)
        .attr('y', 500)
        .attr("font-size", 80)
        .attr('letter-spacing', 0)
        .attr("font-family", "normal normal 300 18px Bebas Neue Book");
      }

      force.start();
    });
});

$(function () {
  // var layoutWidth = $('#skill-view').width();
  // var layoutHeight = $('#skill-view').height();
  //
  // var layout = d3.select('#skill-view').append('svg')
  // .attr('width', layoutWidth)
  // .attr('height', layoutHeight);
  //
  // var y = 230//layoutHeight/2;
  // var dx = 6;
  // var x0 = 75;
  //
  // var nodes = [
  //   {id: 0, x:x0 + 10 * dx, y:y, fixed: true},
  //   {id: 1, x:x0 + 60 * dx, y:y, fixed: true},
  //   {id: 2, x:x0 + 110 * dx, y:y, fixed: true},
  //   {id: 3, x:x0 + 160 * dx, y:y, fixed: true},
  //   {id: 4, x:x0 + 210 * dx, y:y, fixed: true},
  //   {id: 5, x:x0 + 260 * dx, y:y, fixed: true},
  // ];
  //
  // var n = [
  //   {id: 0, x: 60, y:y, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
  //   {id: 1, x: 260, y:y-80, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
  //   {id: 2, x: 260, y:y+80, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
  //   {id: 3, x: 460, y:y-80, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
  //   {id: 4, x: 460, y:y+80, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
  //   {id: 5, x: 660, y:y-170, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
  //   {id: 6, x: 660, y:y, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
  //   {id: 7, x: 660, y:y+170, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
  //   {id: 8, x: 860, y:y-80, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
  //   {id: 9, x: 860, y:y+80, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
  //   {id: 10, x: 1060, y:y, title: 'ЛОГИСТИКА', date: '21.09.15', fixed: true},
  // ];
  //
  // //var sf = skillgen(skilldata);
  //
  // var force = d3.layout.force()
  // .size([layoutWidth, layoutHeight])
  // .nodes(n)
  // .links(sf.links)
  // // .linkStrength(15)
  // // .linkDistance(600)
  // // .gravity(0)
  // .on('tick', tick);
  //
  // function tick() {
  //       // node.attr("cx", function(d) { return d.x; })
  //       //     .attr("cy", function(d) { return d.y; });
  //       link.attr("x1", function(d) { return d.source.x; })
  //       .attr("y1", function(d) { return d.source.y; })
  //       .attr("x2", function(d) { return d.target.x; })
  //       .attr("y2", function(d) { return d.target.y; });
  //
  //       node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  // }
  //
  // var node = layout.selectAll('.node');
  // var link = layout.selectAll('.link');
  //
  // node = node.data(force.nodes());
  // link = link.data(force.links());
  //
  // link.enter().append("line", ".node").attr("class", "link");
  // node.enter().append("g").attr("class", "node").attr("r", 45);
  //
  // node.append("image")
  //     .attr("xlink:href", "https://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png")
  //     .attr("x", -40)
  //     .attr("y", -40)
  //     .attr("width", 80)
  //     .attr("height", 80);
  //
  // node.append('text')
  // .text(function(e){
  //   return e.title;
  // })
  // .attr('fill', 'rgba(255,255,255,255)')
  // .attr('x', -30)
  // .attr('y', 55)
  // .attr("font-size", 10)
  // .attr('letter-spacing', 0.5)
  // .attr("font-family", "normal normal 300 18px Bebas Neue Book");
  //
  // node.append('text')
  // .text(function(e){
  //   return e.date;
  // })
  // .attr('fill', 'rgba(255,255,255,0.3)')
  // .attr('x', -16)
  // .attr('y', 68)
  // .attr("font-size", 8)
  // .attr('letter-spacing', 0.5)
  // .attr("font-family", "normal normal 300 18px Bebas Neue Book");
  //
  // for (var i = 1; i < 7; i++) {
  //   layout.append('text')
  //   .text(i)
  //   .attr('fill', '#F2AE32')
  //   .attr('x', 200 * i-90)
  //   .attr('y', 500)
  //   .attr("font-size", 80)
  //   .attr('letter-spacing', 0)
  //   .attr("font-family", "normal normal 300 18px Bebas Neue Book");
  // }
  //
  // force.start();
});
