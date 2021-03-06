var skillBoard = function (element, data, role) {
  'use strict';
  var layoutWidth = $(element).width();
  var layoutHeight = $(element).height() || 801;
  console.log('ll', layoutWidth, layoutHeight);
  var lineDx = layoutWidth / 6;
  $('#dashboard_talents_btn').text(currentUser.skills.length + '/' + data.skillCount);
  d3.select(element).selectAll('*').remove();
  var layout = d3.select(element).append('svg').attr('width', layoutWidth).attr('height', layoutHeight);
  var y = 230;
  var dx = 6;
  var x0 = 75;
  var imgD = layoutWidth * 0.063;
  var imgR = imgD / 2;
  var force = d3.layout.force().size([
    layoutWidth,
    layoutHeight
  ]).nodes(data.nodes).links(data.links).on('tick', tick);
  function tick() {
    node.attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });
    node.attr('cx', function (d) {
      return d.x;
    }).attr('cy', function (d) {
      return d.y;
    });
    link.attr('x1', function (d) {
      var x = d.target.x - d.source.x;
      var y = d.target.y - d.source.y;
      var angle = Math.round(Math.atan(y / x) * (180 / Math.PI));
      var rad = (angle + 180) * (Math.PI / 180);
      return d.source.x + imgR * Math.cos(rad);
    }).attr('y1', function (d) {
      var x = d.target.x - d.source.x;
      var y = d.target.y - d.source.y;
      var angle = Math.round(Math.atan(y / x) * (180 / Math.PI));
      var rad = (angle + 180) * (Math.PI / 180);
      return d.source.y + imgR * Math.sin(rad);
    }).attr('x2', function (d) {
      var x = d.target.x - d.source.x;
      var y = d.target.y - d.source.y;
      var angle = Math.round(Math.atan(y / x) * (180 / Math.PI));
      var rad = angle * (Math.PI / 180);
      return d.target.x + imgR * Math.cos(rad);
    }).attr('y2', function (d) {
      var x = d.target.x - d.source.x;
      var y = d.target.y - d.source.y;
      var angle = Math.round(Math.atan(y / x) * (180 / Math.PI));
      var rad = angle * (Math.PI / 180);
      return d.target.y + imgR * Math.sin(rad);
    });
  }
  var node = layout.selectAll('.node');
  var link = layout.selectAll('.link');
  node = node.data(force.nodes());
  link = link.data(force.links());
  node.enter().append('g').attr('class', 'node pointer').attr('data-id', function (v) {
    return v.id;
  });
  link.enter().insert('line', '.node');
  link.attr('stroke', function (d) {
    var lineColor = '#fff';
    if (d.lineColor) {
      return '#F2AE32';
    }
    return lineColor;
  }).attr('opacity', function (d) {
    var lineColor = 0.3;
    if (d.lineColor) {
      return 1;
    }
    return lineColor;
  });
  node.on('click', function (d) {
    $('#skill .closing_item').show();
    var skill = $(this);
    $('#skill .closing_item').off('click');
    $('#skill .closing_item').on('click', function () {
      $(this).hide();
      fx.back();
    });
    if (!d.has) {
      if (d.can_take) {
        bodyClickOff();
        $('#skill h4').text('Этот навык доступен для изучения');
        $('#skill button').show();
        $('#skill button').text('Изучить');
        $('#skill button').off('click');
        $('#skill button').on('click', function () {
          $.post('http://176.112.194.149:81/api/v1/skills/' + d.id + '/take.json', { auth_token: currentUser.auth_token }, function () {
            currentUser.skill_point -= d.cost;
            fillSkillPointsInfo(currentUser.skill_point);
            $.getJSON('http://176.112.194.149:81/api/v1/skills.json', {
              auth_token: currentUser.auth_token,
              role: role
            }, function (json) {
              $('#skill button').text('Использовать');
              $('#skill .skill_state').text('Навык изучен');
              var arr = skillgen(json);
              skillBoard('#skill-view', arr, role);
              $('#skills figure[data-id=' + d.id + '] img').removeClass('color_blue_ach');
              $('#skills figure[data-id=' + d.id + '] p').text('Изучен');
              $('#skills figure[data-id=' + d.id + ']').attr('data-has', true);
              // $('#dashboard_talents_btn').text((currentUser.skills.length)+'/'+data.skillCount);
              $('#skill button').off();
              $('#skill button').on('click', function () {
                $.post('http://176.112.194.149:81/api/v1/skills/' + d.id + '/use.json', { auth_token: currentUser.auth_token }, function (usedSkill) {
                  $.getJSON('http://176.112.194.149:81/api/v1/skills.json', {
                    auth_token: currentUser.auth_token,
                    role: role
                  }, function (json) {
                    $('#skill button').off('click');
                    var arr = skillgen(json);
                    skillBoard('#skill-view', arr, role);
                    var date = moment(json.used_at).format('DD.MM.YYYY HH:mm');
                    var cooldown_end_at = null;
                    var date_text = 'Вы использовали навык ' + date;
                    if (json.cooldown_end_at) {
                      cooldown_end_at = moment(json.cooldown_end_at);
                      var duration = moment.duration(moment().diff(cooldown_end_at));
                      button_text = 'До использования ' + duration.format('hh:mm').substr(1);
                      $('#skill button').show().text(button_text).attr('disabled', true);
                    } else {
                      $('#skill button').hide();
                    }
                    $('#skill h4').text(date_text);
                  });
                });
              });
            });
          });
          $('.node[data-id=' + d.id + '] text:last').text('изучен');
        });
      } else {
        $('#skill h4').text('Не изучен');
        $('#skill button').hide();
      }
    } else {
      if (d.used_at === null) {
        $('#skill h4').text('У вас уже есть этот навык');
        $('#skill button').show();
        $('#skill button').text('Использовать');
        $('#skill button').on('click', function () {
          $.post('http://176.112.194.149:81/api/v1/skills/' + d.id + '/use.json', { auth_token: currentUser.auth_token }, function () {
            $.getJSON('http://176.112.194.149:81/api/v1/skills.json', {
              auth_token: currentUser.auth_token,
              role: role
            }, function (json) {
              $('#skill button').off('click');
              var arr = skillgen(json);
              skillBoard('#skill-view', arr, role);
            });
          });
        });
      } else {
        var date = moment(d.used_at).format('DD.MM.YYYY HH:mm');
        var cooldown_end_at = null;
        var date_text = 'Вы использовали навык ' + date;
        if (d.cooldown_end_at) {
          cooldown_end_at = moment(d.cooldown_end_at);
          var duration = moment.duration(moment().diff(cooldown_end_at));
          button_text = 'До использования ' + duration.format('hh:mm').substr(1);
          $('#skill button').show().text(button_text).attr('disabled', true);
        } else {
          $('#skill button').hide();
        }
        $('#skill h4').text(date_text);
      }
    }
    $('#skill h2').text(d.name);
    $('#skill p').text(d.description);
    $('#skill .item_image').attr('src', 'http://176.112.194.149:81' + d.image);
    fx.do([
      'skill',
      'skillBG'
    ]);
  });
  layout.append('filter').attr('id', 'desaturate').append('feColorMatrix').attr('type', 'matrix').attr('values', '0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0');
  node.append('image').attr('xlink:href', function (v) {
    return 'http://176.112.194.149:81' + v.image;
  }).style('filter', function (d) {
    if (!d.has) {
      return 'filter', 'url(#desaturate)';
    } else {
      return '';
    }
  }).attr('x', -imgR).attr('y', -imgR).attr('width', imgD).attr('height', imgD);
  var title = node.append('text').text(function (e) {
    return e.name;
  }).attr('fill', 'rgba(255,255,255,255)').attr('y', imgR + 18).attr('text-anchor', 'middle').attr('font-size', 12).attr('letter-spacing', 1).attr('font-family', 'Bebas Neue Book');
  node.append('text').text(function (e) {
    if (!e.has) {
      if (e.can_take) {
        return 'доступен для изучения';
      } else {
        return 'не изучен';
      }
    } else {
      return 'изучен';
    }
  }).attr('fill', 'rgba(255,255,255,0.3)').attr('y', imgR + 36).attr('text-anchor', 'middle').attr('font-size', 10).attr('letter-spacing', 1).attr('font-family', 'Bebas Neue Book');
  for (var i = 1; i < 7; i++) {
    layout.append('text').text(i).attr('fill', '#F2AE32').attr('x', i * lineDx - lineDx + 180 - 40).attr('y', layoutHeight - 220).attr('font-size', 80).attr('letter-spacing', 0).attr('font-family', 'Bebas Neue Book');
    layout.append('line').attr('x1', i * lineDx - lineDx + 180).attr('y1', 0).attr('x2', i * lineDx - lineDx + 180).attr('y2', layoutHeight - 220).attr('opacity', 0.1).attr('stroke', '#000').attr('stroke-width', 2);
  }
  force.start();
  return layout;
};