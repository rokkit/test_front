var fx = new FX(fxa.dashboard);
var currentUser = JSON.parse(localStorage.getItem('currentUser'));
window.hostUrl = 'http://176.112.194.149:81'

$(function() {
  new svgIcon(
    document.querySelector('#menu_header_btn'),
    svgIconConfig,
    { easing : mina.easein, evtoggle : 'mouseover', size : { w : 34, h : 34 } }
  );
  $('#header img').click(function() {
    document.location.href = '/pages_index.html'
  });

  $('section.username h1').text(currentUser.name);
  if(currentUser.city) {
    $('#city_user span').text(currentUser.city);
  }

  $.getJSON(hostUrl + '/api/v1/users/' + currentUser.id + '.json', {auth_token: currentUser.auth_token}, function(json) {
      var exp = parseInt(json.exp, 10)
      var need_to_levelup = parseInt(json.need_to_levelup, 10)
      $('#need_points').text(need_to_levelup)
      $('#next_level').text(currentUser.level + 1)

      var percentsExp = 0
      if(exp != 0) {
          percentsExp = parseInt(exp*100 / (need_to_levelup + exp))
      }
      $('.progress').css('width', percentsExp + '%' )
      window.currentUser = json
      localStorage.setItem('currentUser', JSON.stringify(window.currentUser))
  })

  $.getJSON(hostUrl + '/api/v1/users/rating.json', {role: currentUser.role, auth_token: currentUser.auth_token}, function(json) {
    makeUserRating(json)
  })
})

function makeUserRating(users) {
  users = _.sortBy(_.filter(users, function(u) { return u.exp > 0 }), function(u) { u.exp }).reverse()
  $('#section-per-month .leaders').empty()
  var user_rating_tpl = _.template($('#user_rating_tpl').html())
  $.each(users, function(i) {

    $('#section-per-month .leaders').append(user_rating_tpl({
      name: this.name,
      number: i+1,
      exp: parseInt(this.exp, 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }))
  })
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
