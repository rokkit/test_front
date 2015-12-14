var fx = new FX(fxa.dashboard);
var currentUser = JSON.parse(localStorage.getItem('currentUser'));
window.hostUrl = 'http://176.112.194.149:81'
_.templateSettings =  {
  interpolate :/\{\{(.+?)\}\}/g
}
function bodyClick(e){
  $('body').on('click', function(e) {
    TweenLite.to('section.error_tooltip', 1, {opacity: 0});
    fx.back();
  });
}
function bodyClickOff(){
  $('body').off('click');
  $('#reserv_succes_form').css('right', '1600');

}

//Загрузка ачивок и скилов

function card(id){
    var achiv = $(this)
    var el = $('#all_ach figure[data-id='+id+']')
    console.log(el.attr('data-open'))
    $('#achivka h2').text(el.find('h6').text())
    $('#achivka p').text(el.attr('data-description'))
    $('#achivka img').attr('src', (el.find('img').attr('src')))
    if(el.data('open') == true) {
      $('#achivka h4').text('Получено')
    } else {
      $('#achivka h4').text('Не получено')
    }
    fx.do(['achiv', 'allAchivBG']);
}

$(function() {
  $.getJSON(window.hostUrl + '/api/v1/achievements.json', {auth_token: currentUser.auth_token, role: currentUser.role}, function(json) {
    $('#achievements').empty()
    $('#all_ach .wrapper_for_ach').empty()
    $('#dashboard_ach_btn').text(currentUser.achievements.length+'/'+json.length)
    var user_achivs = _.map(currentUser.achievements, function(a) { return a.id });
    $.each(json, function(i) {
      var open = _.contains(user_achivs, this.id)
      var klass = ''
      var state = 'Получено'
      if(!open) {
        klass = 'color_blue_ach'
        state = 'Не получено'
      }
      var template = "<figure data-open="+open+" data-id="+this.id+" onclick='card("+this.id+")' data-description='"+this.description+"'><img class='achievments_icon "+klass+"' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>"+state+"</p></ficapation></figure>";
      $('#all_ach .wrapper_for_ach').append(template)
    })
    json = json.slice(0, 5)

      $.each(json, function(i) {
        var open = _.contains(user_achivs, this.id)
        var klass = ''
        var state = 'Получено'
        if(!open) {
          klass = 'color_blue_ach'
          state = 'Не получено'
        }
        var template = "<figure data-open="+open+" data-description='"+this.description+"'><img class='achievments_icon "+klass+"' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>"+state+"</p></ficapation></figure>";
        $('#achievements').append(template)
      })
    })

    $.getJSON(window.hostUrl + '/api/v1/skills.json', {auth_token: currentUser.auth_token, role: currentUser.role}, function(json) {
      $('#skills').empty()

      $('#dashboard_talents_btn').text(currentUser.skills.length+'/'+json.length)
      json = json.slice(0, 5)
        $.each(json, function(i) {

          var klass = ''
          var state = 'Изучен'
          if(!this.has) {
            klass = 'color_blue_ach'
            state = 'Не изучен'
          }
          var template = "<figure data-has="+this.has+" data-id="+this.id+" data-description='"+this.description+"'><img class='achievments_icon "+klass+"' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>"+state+"</p></ficapation></figure>";
          $('#skills').append(template)
        })
    })



  //Открытие всех достижений
  $('#dashboard_ach_btn').click(function(){
    fx.do(['allAchiv', 'background'], bodyClick, bodyClickOff);
  });

  $('#all_ach a').click(fx.back);

  $('#all_talents a').click(fx.back);

  // Открытие всех навыков
  $('#dashboard_talents_btn').click(function(){
    fx.do(['skillBoard', 'background'], bodyClick, bodyClickOff);
  });
  // Открытие достижения
  $(document).on('click', '#achievements figure',function() {
    var achiv = $(this)
    $('#achivka .skill_header').text(achiv.find('h6').text())
    $('#achivka .skill_description').text(achiv.attr('data-description'))
    $('#achivka img').attr('src', (achiv.find('img').attr('src')))

    if(achiv.data('open')) {
      $('#achivka .skill_state').text('Получено')
    } else {
      $('#achivka .skill_state').text('Не получено')
    }

    fx.do(['achiv', 'background'], bodyClick, bodyClickOff);
  });
  // Открытие навыка
  $(document).on('click', '#skills figure', function(){
    var skill = $(this)
    $('#skill .skill_header').text(skill.find('h6').text());
    $('#skill .skill_description').text(skill.attr('data-description'));
    $('#skill img').attr('src', (skill.find('img').attr('src')));
    if(skill.data('has')) {
      $('#skill .skill_state').text('Изучен')
    } else {
      $('#skill .skill_state').text('Не изучен')
    }
    fx.do(['skill', 'background'], bodyClick, bodyClickOff);
  });


  $('.popup').click(function(event){
    event.stopPropagation();
  });

  $('.popup_vertical').click(function(e){
    e.stopPropagation();
  });

  $('.popup_horizontal').click(function(e){
    e.stopPropagation();
  });

})
