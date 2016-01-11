var fx = new FX(fxa.dashboard);
var currentUser = JSON.parse(localStorage.getItem('currentUser'));
window.hostUrl = 'http://176.112.194.149:81';
_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
function bodyClick(e) {
  $('body').on('click', function (e) {
    TweenLite.to('section.error_tooltip', 1, { opacity: 0 });
    fx.back();
  });
}
function mobilecheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}
function bodyClickOff() {
  $('body').off('click');
  $('#reserv_succes_form').css('right', '1600');
}
//Загрузка ачивок и скилов
function card(id) {
  var achiv = $(this);
  var el = $('#all_ach figure[data-id=' + id + ']');
  $('#achivka h2').text(el.find('h6').text());
  $('#achivka p').text(el.attr('data-description'));
  $('#achivka img').attr('src', el.find('img').attr('src'));
  if (el.data('open') == true) {
    $('#achivka h4').text('Получено');
  } else {
    $('#achivka h4').text('Не получено');
  }
  fx.do([
    'achiv',
    'allAchivBG'
  ]);
}
function drawAchievementDetail(name, description, image, open) {
  $('#achivka .skill_header').text(name);
  $('#achivka .skill_description').text(description);
  $('#achivka .item_image').attr('src', image);
  if (open) {
    $('#achivka .skill_state').text('Получено');
  } else {
    $('#achivka .skill_state').text('Не получено');
  }
}
$(function () {
  var itemCount = null
  if (mobilecheck()) {
    itemCount = 3
  } else {
    itemCount = 5
  }
  $.getJSON(window.hostUrl + '/api/v1/achievements.json', {
    auth_token: currentUser.auth_token,
    role: currentUser.role
  }, function (json) {
    $('#achievements').empty();
    $('#all_ach .wrapper_for_ach').empty();
    $('#dashboard_ach_btn').text(currentUser.achievements.length + '/' + json.length);
    var user_achivs = _.map(currentUser.achievements, function (a) {
      return a.id;
    });
    var achievementsNotViewed = [];
    $.each(json, function (i) {
      var klass = '';
      var state = 'Получено';
      if (!this.open) {
        klass = 'color_blue_ach';
        state = 'Не получено';
      } else {
        //показать модалку ачивки если еще не видел ее до этого
        if (!this.viewed) {
          achievementsNotViewed.push(this);
        }
      }
      var template = '<figure data-open=' + this.open + ' data-id=' + this.id + ' onclick=\'card(' + this.id + ')\' data-description=\'' + this.description + '\'><img class=\'achievments_icon ' + klass + '\' src=\'' + window.hostUrl + this.image + '\'><ficapation><h6>' + this.name + '</h6><p>' + state + '</p></ficapation></figure>';
      $('#all_ach .wrapper_for_ach').append(template);
    });
    //показать модалку ачивки если еще не видел ее до этого
    if (achievementsNotViewed.length > 0) {
      var achiv = achievementsNotViewed[0];
      setTimeout(function () {
        drawAchievementDetail(achiv.name, achiv.description, hostUrl + achiv.image, achiv.open);
        fx.do([
          'achiv',
          'background'
        ], bodyClick, bodyClickOff);
        $.post(hostUrl + '/api/v1/achievements/' + achiv.id + '/viewed.json', { auth_token: currentUser.auth_token }, function () {
        });
      }, 2000);
    }

    json = json.slice(0, itemCount);
    $.each(json, function (i) {
      var klass = '';
      var state = 'Получено';
      if (!this.open) {
        klass = 'color_blue_ach';
        state = 'Не получено';
      }
      var template = '<figure data-open=' + this.open + ' data-description=\'' + this.description + '\'><img class=\'achievments_icon ' + klass + '\' src=\'' + window.hostUrl + this.image + '\'><ficapation><h6>' + this.name + '</h6><p>' + state + '</p></ficapation></figure>';
      $('#achievements').append(template);
    });
  });
  $.getJSON(window.hostUrl + '/api/v1/skills.json', {
    auth_token: currentUser.auth_token,
    role: currentUser.role
  }, function (json) {
    $('#skills').empty();
    $('#dashboard_talents_btn').text(currentUser.skills.length + '/' + json.length);
    json = json.slice(0, itemCount);
    $.each(json, function (i) {
      var klass = '';
      var state = 'Изучен';
      if (!this.has) {
        klass = 'color_blue_ach';
        state = 'Не изучен';
      }
      var template = '<figure data-cost=' + this.cost + ' data-name=\'' + this.name + '\' data-used_at=' + this.used_at + ' data-cooldown_end_at=\'' + this.cooldown_end_at + '\' data-can_take=' + this.can_take + ' data-has=' + this.has + ' data-id=' + this.id + ' data-description=\'' + this.description + '\'><img class=\'achievments_icon ' + klass + '\' src=\'' + window.hostUrl + this.image + '\'><ficapation><h6>' + this.name + '</h6><p>' + state + '</p></ficapation></figure>';
      $('#skills').append(template);
    });
  });
  //Открытие всех достижений
  $('#dashboard_ach_btn').click(function () {
    fx.do([
      'allAchiv',
      'background'
    ], bodyClick, bodyClickOff);
  });
  $('#all_ach a').click(fx.back);
  $('#all_talents a').click(fx.back);
  // Открытие всех навыков
  $('#dashboard_talents_btn').click(function () {
    fx.do([
      'skillBoard',
      'background'
    ], bodyClick, bodyClickOff);
  });
  // Открытие достижения
  $(document).on('click', '#achievements figure', function () {
    var achiv = $(this);
    drawAchievementDetail(achiv.find('h6').text(), achiv.attr('data-description'), achiv.find('img').attr('src'), achiv.data('open'));
    fx.do([
      'achiv',
      'background'
    ], bodyClick, bodyClickOff);
  });
  // Открытие навыка
  $(document).on('click', '#skills figure', function () {
    var skill = $(this);
    var d = $(this).data();
    $('#skill .closing_item').show();
    console.log(d);
    $('#skill .skill_header').text(d.name);
    $('#skill .skill_description').text(d.description);
    $('#skill .item_image').attr('src', skill.find('img').attr('src'));
    if (d.has) {
      $('#skill .skill_state').text('Изучен');
    } else {
      $('#skill .skill_state').text('Не изучен');
    }
    $('#skill .closing_item').off('click');
    $('#skill .closing_item').on('click', function () {
      console.log('clcik');
      $(this).hide();
      fx.back();
    });
    $('#skill button').attr('disabled', false);
    if (!d.has) {
      if (d.can_take) {
        console.log('162');
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
              role: currentUser.role
            }, function (json) {
              $('#skill button').text('Использовать');
              $('#skill .skill_state').text('Навык изучен');
              skill.data('has', true);
              skill.data('can_take', false);
              skill.find('p').text('Изучен');
              skill.find('img').removeClass('color_blue_ach');
              // $('#dashboard_talents_btn').text((currentUser.skills.length)+'/'+data.skillCount);
              $('#skill button').off();
              $('#skill button').attr('disabled', false);
              $('#skill button').on('click', function () {
                $.post('http://176.112.194.149:81/api/v1/skills/' + d.id + '/use.json', { auth_token: currentUser.auth_token }, function (usedSkill) {
                  $.getJSON('http://176.112.194.149:81/api/v1/skills.json', {
                    auth_token: currentUser.auth_token,
                    role: currentUser.role
                  }, function (json) {
                    $('#skill button').off('click');
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
        });
      } else {
        $('#skill h4').text('Не изучен');
        $('#skill button').hide();
      }
    } else {
      console.log('224');
      if (d.used_at === null) {
        $('#skill h4').text('У вас уже есть этот навык');
        $('#skill button').show();
        $('#skill button').text('Использовать');
        $('#skill button').on('click', function () {
          $.post('http://176.112.194.149:81/api/v1/skills/' + d.id + '/use.json', { auth_token: currentUser.auth_token }, function () {
            $.getJSON('http://176.112.194.149:81/api/v1/skills.json', {
              auth_token: currentUser.auth_token,
              role: currentUser.role
            }, function (json) {
              $('#skill button').off('click');
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
    fx.do([
      'skill',
      'background'
    ]);
  });
  $('.popup').click(function (event) {
    event.stopPropagation();
  });
  $('.popup_vertical').click(function (e) {
    e.stopPropagation();
  });
  $('.popup_horizontal').click(function (e) {
    e.stopPropagation();
  });
});
window.waitForUserChoose = false;
setInterval(function () {
  if (!window.waitForUserChoose) {
    getNewAchivs();
  }
}, 4000);
function getNewAchivs() {
  $.getJSON(window.hostUrl + '/api/v1/achievements.json', {
    auth_token: currentUser.auth_token,
    role: currentUser.role
  }, function (json) {
    var achievementsNotViewed = [];
    $.each(json, function (i) {
      if (this.open && !this.viewed) {
        //показать модалку ачивки если еще не видел ее до этого
        achievementsNotViewed.push(this);
      }
    });
    //показать модалку ачивки если еще не видел ее до этого
    if (achievementsNotViewed.length > 0) {
      window.waitForUserChoose = true;
      var achiv = achievementsNotViewed[0];
      drawAchievementDetail(achiv.name, achiv.description, hostUrl + achiv.image, achiv.open);
      fx.do([
        'achiv',
        'background'
      ], function () {
        $('body').on('click', function (e) {
          $.post(hostUrl + '/api/v1/achievements/' + achiv.id + '/viewed.json', { auth_token: currentUser.auth_token }, function () {
            window.waitForUserChoose = false;
          });
          fx.back();
        });
      }, bodyClickOff);
      var achivEl = $('#achievements figure[data-id=' + achiv.id + ']');
      achivEl.data('open', true);
      achivEl.find('img.achievments_icon').removeClass('color_blue_ach').prependTo('#achievements');
    }
  });
}
