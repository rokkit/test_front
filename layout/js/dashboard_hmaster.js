var fx = new FX(fxa.dashboard);
var currentUser = JSON.parse(localStorage.getItem('currentUser'));
window.hostUrl = 'http://176.112.194.149:81'

$(function(){

  function rndR(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
  }

  var layoutWidth = $('#face').width();
  var layoutHeight = $('#face').height();

  var layout = d3.select('#face').append('svg')
  .attr('width', layoutWidth)
  .attr('height', layoutHeight);

  layout.append("defs")
      .append('pattern')
      .attr("id", "face-img")
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 200)
      .attr('height', 200)
      .attr('patternUnits', 'userSpaceOnUse')
      .append("image")
      .attr('x', 20)
      .attr('y', 0)
      .attr('width', 200)
      .attr('height', 200)


  layout.append('circle')
  .attr('r', 70)
  .attr('fill', 'transparent')
  .attr('stroke', '#fff')
  .attr('opacity', 0.4)
  .attr('cx', layoutWidth/2)
  .attr('cy', layoutHeight/2);

  layout.append('circle')
  .attr('r', 50)
  .attr('stroke', '#EBB22F')
  .attr('stroke-width', 2.5)
  .attr('fill', 'transparent')
  .attr('cx', layoutWidth/2)
  .attr('cy', layoutHeight/2);

  layout.append('circle')
  .attr('r', 44)
  // .attr('stroke', '#EBB22F')
  // .attr('stroke-width', 2.5)
  .attr('fill', 'url(#face-img)')
  .attr('cx', layoutWidth/2)
  .attr('cy', layoutHeight/2);

  for (var i = 0; i < 360; i += 12) {
    var r = rndR(68, 100);
    layout.append('line')
    .attr('stroke', '#EBB22F')
    .attr('opacity', function(){
      var res = 1;
      if(r < 85){
        res = 0.6;
      }
      if(r < 80){
        res = 0.4;
      }
      if(r < 76){
        res = 0.2;
      }
      return res;
    })
    .attr('stroke-width', '2.4')
    .attr('x1', function(d){
      var rad = i * (Math.PI/180);
      return 100 + 50 * Math.cos(rad);
    })
    .attr('y1', function(d){
      var rad = i * (Math.PI/180);
      return 100 + 50 * Math.sin(rad);
    })
    .attr('x2', function(d){
      var rad = i * (Math.PI/180);
      return 100 + r * Math.cos(rad);
    })
    .attr('y2', function(d){
      var rad = i * (Math.PI/180);
      return 100 + r * Math.sin(rad);
    });
  }

});

$(function() {
  $('.popup_vertical_symbol').css('pointer-events', 'none');
  new svgIcon(
    document.querySelector('#menu_header_btn'),
    svgIconConfig,
    { easing : mina.easein, evtoggle : 'mouseover', size : { w : 34, h : 34 } }
  );
  $('#menu_header_logo').click(function() {
    document.location.href = '/pages_index.html'
  });

  $('#logout_btn').click(function() {
    localStorage.removeItem('currentUser')
    window.currentUser = null
    document.location.href = '/pages_index.html'
  });

  var name = currentUser.name
  if(currentUser.name.split(' ').length > 2) {
    var name = currentUser.name.split(' ')
    name.pop()
    name = name.join(' ')
  }


  $('section.username h1').text(name);
  if(currentUser.city) {
    $('#city_user span').text(currentUser.city);
  }

  $.getJSON(hostUrl + '/api/v1/users/' + currentUser.id + '.json', {auth_token: currentUser.auth_token}, function(json) {
      var exp = parseInt(json.exp, 10);
      var need_to_levelup = parseInt(json.need_to_levelup, 10);
      $('#need_points').text(need_to_levelup);
      $('#next_level').text(currentUser.level + 1);
      $('#hookmaster_description').text(json.hobby);
      if(json.country !== '' && json.city !== ''){
          $('#city_user').append('<span>').text(json.city + ', '+json.country);
      }else {
        var a = $('<a>');
        a.text('Укажите в редактирование профиля город и страну');
        a.css('opacity', 0.4);
        a.on('click', function(){
          $('#edit-profile').css('display', 'block');
          fx.do(['background', 'editProfile'], bodyClick, function(){
            $('#edit-profile').css('display', 'none');
            $('body').off('click');
          });
        });
        $('#city_user').append('<span>').append(a);
      }

      var percentsExp = 0;
      if(exp != 0) {
          percentsExp = parseInt(exp*100 / (need_to_levelup + exp));
      }
      $('.progress').css('width', percentsExp + '%' )
      window.currentUser = json
      localStorage.setItem('currentUser', JSON.stringify(window.currentUser))
      if (currentUser.role == 'user' && document.location.href.split('/')[3] == 'dashboard_hmaster.html') {
        document.location.href = '/dashboard_client.html'
      }
  })

  $.getJSON(hostUrl + '/api/v1/users/rating.json', {role: currentUser.role, auth_token: currentUser.auth_token}, function(json) {
    makeUserRating(json.users_month, json.users_all_time)
  })
  // $.getJSON(hostUrl + '/api/v1/works.json', {auth_token: currentUser.auth_token}, function(json) {
  //   makeHookmasterWorks(json)
  // })

  $.getJSON(hostUrl + '/api/v1/users/' + currentUser.id + '/load_hookmaster_data.json', {auth_token: currentUser.auth_token}, function(json) {
    makeHookmasterWorks(json.works)
    makeHookmasterBonuses(json.bonuses)
    makeHookmasterPenalties(json.penalties)
  })
})


function drawBonusDetail(name, description, image, open) {
  console.log(name)
  $('#bonus_detail .skill_header').text(name)
  $('#bonus_detail .skill_description').text(description)
  $('#bonus_detail .item_image').attr('src', image)
}

function makeHookmasterBonuses(bonuses) {
  var bonusesItemTpl = _.template($('#bonuses_item_tpl').html())
  $('#bonuses_list').empty()
  bonuses = bonuses.slice(0,3)
  _.each(bonuses, function(bonus) {
    if (!bonus.has) {
      bonus.has_class = 'color_blue_ach'
    } else {
      bonus.has_class = ''
    }
    $('#bonuses_list').append(bonusesItemTpl(bonus))
  });
  $('#bonuses_list figure').on('click', function() {
    drawBonusDetail($(this).data('name'), $(this).data('description'), $(this).data('image'), $(this).data('has'))
    fx.do(['bonus_detail', 'background'], bodyClick, bodyClickOff);
  })
}
function makeHookmasterPenalties(penalties) {
  var bonusesItemTpl = _.template($('#bonuses_item_tpl').html())
  $('#penalties_list').empty()
  penalties = penalties.slice(0,3)
  _.each(penalties, function(penalty) {
    if (!penalty.has) {
      penalty.has_class = 'color_blue_ach'
    } else {
      penalty.has_class = ''
    }

    $('#penalties_list').append(bonusesItemTpl(penalty))
  });
  $('#penalties_list figure').on('click', function() {
    drawBonusDetail($(this).data('name'), $(this).data('description'), $(this).data('image'), $(this).data('has'))
    fx.do(['bonus_detail', 'background'], bodyClick, bodyClickOff);
  })
}

function makeUserRating(users_month, users_all_time) {
  users_month = _.sortBy(_.filter(users_month, function(u) { return u.exp > 0 }), function(u) { u.exp }).reverse()
  $('#section-per-month .leaders').empty()
  var user_rating_tpl = _.template($('#user_rating_tpl').html())
  $.each(users_month, function(i) {
    if(i == users_month.length - 1) {
      $('#section-per-month #rating_top').append('<div class="border-bottom-dashed"></div>')
    }
    $('#section-per-month #rating_top').append(user_rating_tpl({
      name: this.name,
      number: i + 1,
      exp: parseInt(this.exp, 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }))
  })

  users_all_time = _.sortBy(_.filter(users_all_time, function(u) { return u.exp > 0 }), function(u) { u.exp }).reverse()
  $('#section-per-all-time .leaders').empty()
  $.each(users_all_time, function(i) {
    if(i == users_all_time.length - 1) {
      $('#section-per-all-time .leaders').append('<div class="border-bottom-dashed"></div>')
    }
    $('#section-per-all-time .leaders').append(user_rating_tpl({
      name: this.name,
      number: i + 1,
      exp: parseInt(this.exp, 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }))
  })
}
function makeHookmasterWorks(works) {
  if(works.length > 0) {
    $('#works .nodata').hide();
    $('#works_table').show();
    $('#works_table tbody').empty()
    var work_tpl = _.template($('#work_tpl').html())
    $.each(works, function(i) {
      var work_at = moment(this.work_at)
      var end_work_at = moment(this.end_work_at)

      $('#works_table tbody').append(work_tpl({
        id: this.id,
        lounge: this.lounge.title,
        work_at: work_at.format('YYYY-MM-DD HH:mm'),
        end_work_at: end_work_at.format('HH:mm'),
        amount: parseInt(this.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      }))
    })
  } else {
    $('#works_table').hide();
    $('#works .nodata').show();
  }
}

function bodyClickOff(){
  $('#edit-profile').hide();
  $('body').off('click');
  $('#reserv_succes_form').css('right', '1600');
}

// PRELOADER
$(function() {
  var html_body = document.getElementById("main_content")
  TweenLite.to(html_body, 1, {opacity:1})
})

function bodyClick(e){
  $('body').on('click', function(e) {
    TweenLite.to('section.error_tooltip', 1, {opacity: 0});
    fx.back();
  });
}
