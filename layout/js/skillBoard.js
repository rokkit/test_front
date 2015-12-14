var skillBoard = (function(element, data, role){
  'use strict';

  var layoutWidth = $(element).width();
  var layoutHeight = $(element).height();

  $('#dashboard_talents_btn').text((currentUser.skills.length+1)+'/'+data.skillCount);

  d3.select(element).selectAll('*').remove();
  var layout = d3.select(element)
  .append('svg')
  .attr('width', layoutWidth)
  .attr('height', layoutHeight);

  var y = 230;
  var dx = 6;
  var x0 = 75;

  var force = d3.layout.force()
  .size([layoutWidth, layoutHeight])
  .nodes(data.nodes)
  .links(data.links)
  .on('tick', tick);

  function tick() {
        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
            link
            .attr("x1", function(d) {
              var x = d.target.x - d.source.x;
              var y = d.target.y - d.source.y;

              var angle = Math.round( Math.atan( ( y ) / ( x ) ) * ( 180 / Math.PI ) );
              var rad = (angle + 180) * (Math.PI/180);
              return d.source.x + 40 * Math.cos(rad);
            })
            .attr("y1", function(d) {
              var x = d.target.x - d.source.x;
              var y = d.target.y - d.source.y;

              var angle = Math.round( Math.atan( ( y ) / ( x ) ) * ( 180 / Math.PI ) );
              var rad = (angle+180) * (Math.PI/180);
              return d.source.y + 40 * Math.sin(rad);
            })
            .attr("x2", function(d) {
              var x = d.target.x - d.source.x;
              var y = d.target.y - d.source.y;

              var angle = Math.round( Math.atan( ( y ) / ( x ) ) * ( 180 / Math.PI ) );
              var rad = angle * (Math.PI/180);
              return d.target.x + 40 * Math.cos(rad);
            })
            .attr("y2", function(d) {
              var x = d.target.x - d.source.x;
              var y = d.target.y - d.source.y;

              var angle = Math.round( Math.atan( ( y ) / ( x ) ) * ( 180 / Math.PI ) );
              var rad = angle * (Math.PI/180);
              return d.target.y + 40 * Math.sin(rad);
            });
  }

  var node = layout.selectAll('.node');
  var link = layout.selectAll('.link');

  node = node.data(force.nodes());
  link = link.data(force.links());

  node.enter().append("g")
  .attr("class", "node pointer")
  .attr('data-id', function(v) { return v.id });

  link.enter().insert("line", ".node");

  link
  .attr('stroke', function(d){
    var lineColor = '#fff';
    if(d.lineColor){
      return '#F2AE32';
    }
    return lineColor;
  })
  .attr('opacity', function(d){
    var lineColor = 0.3;
    if(d.lineColor){
      return 1;
    }
    return lineColor;
  });

  node.on('click', function(d){
    var skill = $(this)
    if(!d.has){
      if(d.can_take){
        $('#skill h4').text('ЭТОТ НАВЫК ДОСТУПЕН ДЛЯ ИЗУЧЕНИЯ');
        $('#skill button').show();
        $('#skill button').text('Изучить');
        $('#skill button').off('click');
        $('#skill button').on('click', function(){
          $.post(
            'http://176.112.194.149:81/api/v1/skills/'+d.id+'/take.json',
            {auth_token: currentUser.auth_token},
            function(){
              $.getJSON(
                'http://176.112.194.149:81/api/v1/skills.json',
                {auth_token: currentUser.auth_token, role: role},
                function(json) {
                  $('#skill button').off('click');
                  var arr = skillgen(json);
                  skillBoard('#skill-view', arr, role);
              });
            }
          );
          $('.node[data-id='+d.id+'] text:last').text('изучен');
          //$('#dashboard_talents_btn').text((currentUser.skills.length+1)+'/'+data.skillCount);
        });
      }else{
        $('#skill h4').text('ЭТОТ НАВЫК НЕ ИЗУЧЕН');
        $('#skill img').addClass('color_blue_ach');
        $('#skill button').hide();
      }
    }else{
      if(d.used_at === null){
        $('#skill h4').text('У ВАС УЖЕ ЕСТЬ ЭТОТ НАВЫК');
        $('#skill button').show();
        $('#skill button').text('Использовать');
        $('#skill button').on('click', function(){
          $.post(
            'http://176.112.194.149:81/api/v1/skills/'+d.id+'/use.json',
            {auth_token: currentUser.auth_token},
            function(){
              $.getJSON(
                'http://176.112.194.149:81/api/v1/skills.json',
                {auth_token: currentUser.auth_token, role: role},
                function(json) {
                  $('#skill button').off('click');
                  var arr = skillgen(json);
                  skillBoard('#skill-view', arr, role);
              });
            }
          );
        });
      }else{
        var date = moment(d.used_at).format('YYYY-MM-DD');
        $('#skill h4').text(date);
        $('#skill button').hide();
      }

    }
    $('#skill h2').text(d.name);
    $('#skill p').text(d.description);
    $('#skill img').attr('src', 'http://176.112.194.149:81'+d.image);
    fx.do(['skill', 'skillBG']);
  });

  layout.append('filter')
  .attr('id','desaturate')
  .append('feColorMatrix')
  .attr('type','matrix')
  .attr('values',"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0");

  node.append("image")
      .attr("xlink:href", function(v){
        return 'http://176.112.194.149:81'+v.image;
      })
      .style("filter", function(d){
        if(!d.can_take && !d.has){
          return ("filter", "url(#desaturate)");
        }else{
          return '';
        }
      })
      .attr("x", -40)
      .attr("y", -40)
      .attr("width", 80)
      .attr("height", 80)

  var title = node.append('text')
  .text(function(e){
    return e.name;
  })
  .attr('fill', 'rgba(255,255,255,255)')
  .attr('y', 60)
  .attr("text-anchor", "middle")
  .attr("font-size", 12)
  .attr('letter-spacing', 1)
  .attr("font-family", "Bebas Neue Book");

  node.append('text')
  .text(function(e){
    if (!e.has){
      return 'не изучен';
    } else {
      return 'изучен';
    }
  })
  .attr('fill', 'rgba(255,255,255,0.3)')
  .attr('y', 75)
  .attr("text-anchor", "middle")
  .attr("font-size", 10)
  .attr('letter-spacing', 1)
  .attr("font-family", "Bebas Neue Book");

  for (var i = 1; i < 7; i++) {
    layout.append('text')
    .text(i)
    .attr('fill', '#F2AE32')
    .attr('x', 200 * i-90)
    .attr('y', 500)
    .attr("font-size", 80)
    .attr('letter-spacing', 0)
    .attr("font-family", "Bebas Neue Book");

    layout.append('line')
    .attr('x1', 200 * i-55)
    .attr('y1', 10)
    .attr('x2', 200 * i-55)
    .attr('y2', 500)
    .attr('opacity', 0.1)
    .attr('stroke', '#000')
    .attr('stroke-width', 2)
  }

  force.start();

  return layout;
});
