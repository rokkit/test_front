var currentUser = JSON.parse(localStorage.getItem('currentUser'))
$(function() {

  // Hamburger
  new svgIcon(
    document.querySelector('#menu_header_btn'),
    svgIconConfig,
    { easing : mina.easein, evtoggle : 'mouseover', size : { w : 34, h : 34 } }
  );


  //Работа с сервером
  window.hostUrl = 'http://192.168.1.39:82'

  		if (currentUser) {
      		$('section.username h1').text(currentUser.name)
      		$('#login_btn').text(currentUser.name)
  		}
    //Загрузить начальные данные
    $(function() {
      $.getJSON(hostUrl + '/api/v1/reservations/load_data.json', {auth_token: currentUser.auth_token}, function(json) {
        _.each(json.lounges, function(lounge) {
          //console.log(lounge)
          $('select[name="lounge"]').append("<option value="+lounge.id+">"+ lounge.title +"</option>")
          $('select[name="table"]').append("<optgroup data-id="+lounge.id+" label='"+lounge.title+"'>")
            _.each(lounge.tables, function(table) {
                $('optgroup[data-id='+lounge.id+']').append("<option value="+table.id+">"+ table.title +"</option>")
            })
          $('select[name="table"]').append("</optgroup>")
        })
        var tables = $('select[name="table"]').html()
        $('select[name="lounge"]').on('change', function() {

          var lounge = $('select[name="lounge"]').val()
          console.log('change', tables)
          var options = $(tables).filter("optgroup[data-id="+lounge+"]").html()
          if (options) {
            $('select[name="table"]').html(options)
          } else {
            $('select[name="table"]').empty()
          }
        });
      });
      getReservations();

    });

  	$('#n_o_a').click(function(e){
      ReservForm();
      $('.popup').click(function(event){
        event.stopPropagation();
      });
      bodyClick();
  	});

    $('#invite').click(function(){
      animateForm('invite_form');
    });

    $('#reserv_form').submit(function(e){
      e.preventDefault();
      $.post(hostUrl + '/api/v1/reservations.json', {
        auth_token: currentUser.auth_token,
        table_id: $('select[name=table]').val(),
        visit_date: $('input[name=visit_date]').val() + ' ' + $('input[name=visit_time]').val()
      }, function() {
        getReservations()
      })
      ReservSuccessForm();
    });

    $('#reserv_succes_form').submit(function(e){
      animateRevers();
      $('#reserv_succes_form').click(function(event){
        event.stopPropagation();
      });
      e.preventDefault();
    });


    //Открытие всех достижений
    $('#dashboard_ach_btn').on('click', function() {
      animateAchiv();
      //animateVertical_popup('all_ach')
    });

    $('#all_ach a').click(function(){
      achivReverse();
    });

    $('#all_talents a').click(function(){
      talentsReverse();
    });

    // Открытие всех навыков
    $('#dashboard_talents_btn').on('click', function() {
      //animateVertical_popup('all_talents')
      animateTalents();
    });
    // Открытие достижения
    $(document).on('click', '#achievements figure',function() {
      var achiv = $(this)
      $('#achivka h2').text(achiv.find('h6').text())
      $('#achivka p').text(achiv.attr('data-description'))
      $('#achivka img').attr('src', (achiv.find('img').attr('src')))
      animateOverall_popup('achivka')
    });
});

// PRELOADER
$(function() {
  var html_body = document.getElementById("main_content")
  TweenLite.to(html_body, 1, {opacity:1})
})

function bodyClick(){
  $('body').on('click', function(e) {
    if(e.target.tagName !== 'BUTTON'){
      animateRevers();
    }
  });
}

function animateFormSuccess(el) {
  var form2 = document.getElementById(el)
  var html_body2 = document.getElementById("html_body")
  var color_overlay2 = document.getElementById("color_overlay")
  var main2 = document.getElementById('main_content')
  var wrapper2 =document.getElementById('wrapper_login')
  var tl = null

  var tw1 = TweenLite.to(form2, 1, {right:"0px", onComplete: function() {
    $('.popup').click(function(event){
      event.stopPropagation();
    });

    bodyClick(tl);

  }})
  var tw2 = TweenLite.to(color_overlay2, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw3 = TweenLite.to(main2, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  var tw4 = TweenLite.to(html_body2, 1, {overflow:"hidden"})
  var tw5 = TweenLite.to(form2, 1, {'pointer-events':"auto"})
  tl = new TimelineLite().add([tw1,tw2,tw3,tw4,tw5], 'sequence');
}

var animation = {
  level: 0,
  body: {},
  reserv: {},
  success: {},
  achiv: {},
  talents: {}
};

function animateBG(){
  animation.body = new TimelineLite()
  .to('.color_overlay', 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"}, 'sequence')
  .to('#main_content', 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"}, 'sequence')
  .to('body', 1, {overflow:"hidden"}, 'sequence');
}

function animateReserv(){
  animation.reserv = new TimelineLite()
  .to('#reserv_form', 1, {left:"160px", 'pointer-events':"auto"}, 'sequence');
  animation.level = 1;
}

function animateSuccess(){
  animation.success = new TimelineLite()
  .to('#reserv_succes_form', 1, {right:"0px", 'pointer-events':"auto"}, 'sequence');
  animation.level = 2;
}

function ReservForm(){
  animateReserv();
  animateBG();
}

function ReservSuccessForm(){
  TweenLite.to('#reserv_form', 1, {left:"1860px", 'pointer-events':"auto"}, 'sequence');
  animateSuccess();
}

function animateRevers(){
  if(animation.level === 1){
    TweenLite.to('#reserv_form', 1, {left:"1860px", 'pointer-events':"auto"}, 'sequence');
  }else{
      TweenLite.to('#reserv_succes_form', 1, {right:"-1260px", 'pointer-events':"auto"}, 'sequence');
  }
  animation.body.reverse();
}

//Анимация формы бронирования
function animateForm(el) {
  var form1 = document.getElementById(el)
  var html_body1 = document.getElementById("html_body")
  var color_overlay1 = document.getElementById("color_overlay")
  var main1 = document.getElementById('main_content')
  var wrapper1 = document.getElementById('wrapper_login')
  var tl = null;
  var tw1 = TweenLite.to(form1, 1, {left:"160px", onComplete: function() {
    $('.popup').click(function(event){
      event.stopPropagation();
    });
    bodyClick(tl);

  }})
  var tw2 = TweenLite.to(color_overlay1, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw3 = TweenLite.to(main1, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  var tw4 = TweenLite.to(html_body1, 1, {overflow:"hidden"})
  var tw5 = TweenLite.to(form1, 1, {'pointer-events':"auto"})
  tl = new TimelineLite().add([tw1,tw2,tw3,tw4,tw5], 'sequence');
}

//Анимация модалки всех ачивок
function animateVertical_popup(el) {
  var all_ach = document.getElementById(el)
  var html_body = document.getElementById("html_body")
  var color_overlay = document.getElementById("color_overlay")
  var main = document.getElementById('main_content')
  var wrapper = $('#all_ach_wrapper')[0]

  var tl = null

  var tw1 = TweenLite.to(all_ach, 1, {top:"80px", 'pointer-events':"auto", onComplete: function() {
    //bodyClick(tl);
  }})
  var tw2 = TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw3 = TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  var tw4 = TweenLite.to('body', 1, {overflow:"hidden"})
  var tw5 = TweenLite.to(wrapper, 1, {'pointer-events':"auto"})
  tl = new TimelineLite().add([tw1,tw2,tw3, tw4, tw5], 'normal');
}

function animateAchiv(){
  animation.achiv = new TimelineLite()
  .to('#all_ach', 1, {top:"80px"});
  animateBG();
  TweenLite.to('#all_ach_wrapper', 1, {'pointer-events':"auto"});
  $('#all_ach .popup_vertical_symbol').css('pointer-events',"none");
}

function animateTalents(){
  animation.talents = new TimelineLite()
  .to('#all_talents', 1, {top:"80px"});
  animateBG();
  TweenLite.to('#all_ach_wrapper', 1, {'pointer-events':"auto"});
  $('#all_talents .popup_vertical_symbol').css('pointer-events',"none");
  $('#all_talents').css('pointer-events',"auto");
}

function achivReverse(){
  TweenLite.to('#all_ach', 1, {top:"1800px"});
  //animation.achiv.reverse();
  animation.body.reverse();
  TweenLite.to('#all_ach_wrapper', 1, {'pointer-events':"none"});
}

function talentsReverse(){
  animation.talents.reverse();
  animation.body.reverse();
  TweenLite.to('#all_ach_wrapper', 1, {'pointer-events':"none"});
}

//Анимация модалки навыков
function animateOverall_popup(el) {
  var achivka = document.getElementById(el)
  var html_body = document.getElementById("html_body")
  var color_overlay = document.getElementById("color_overlay")
  var main = document.getElementById('main_content')
  var tl = null
  var tw1 = TweenLite.to(achivka, 0.5, {top:"0", onComplete: function() {
    bodyClick(tl);
  }})
  var tw2 = TweenLite.to(color_overlay, 0.5, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw3 = TweenLite.to(main_content, 0.5, {filter:"blur(5px)", "-webkit-filter":"blur(4px)"})
  var tw4 = TweenLite.to('body', 0.5, {overflow:"hidden"})
  tl = new TimelineLite().add([tw1,tw2,tw3,tw4], 'normal');
}

//Загрузка ачивок и скилов

$(function() {
  $.getJSON(window.hostUrl + '/api/v1/achievements.json', {auth_token: currentUser.auth_token}, function(json) {
    $('#achievements').empty()
    $('#all_ach .wrapper_for_ach').empty()
    $('#dashboard_ach_btn').text(0+'/'+json.length)
    $.each(json, function(i) {
      var template = "<figure data-description='"+this.description+"'><img class='achievments_icon' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>21.09.15</p></ficapation></figure>";
      $('#all_ach .wrapper_for_ach').append(template)
    })
    json = json.slice(0, 6)

      $.each(json, function(i) {
        var template = "<figure data-description='"+this.description+"'><img class='achievments_icon' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>21.09.15</p></ficapation></figure>";
        $('#achievements').append(template)
      })
    })
    $.getJSON(window.hostUrl + '/api/v1/skills.json', {auth_token: currentUser.auth_token}, function(json) {
      $('#skills').empty()
      $('#dashboard_talents_btn').text(0+'/'+json.length)
      json = json.slice(0, 5)

        $.each(json, function(i) {
          var template = "<figure><img class='achievments_icon' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>21.09.15</p></ficapation></figure>";
          $('#skills').append(template)
        })
    })
})


// Центрирование попапов
$(function() {
	jQuery.fn.center = function(parent) {
    if (parent) {
        parent = this.parent();
    } else {
        parent = window;
    }
    this.css({
        "position": "absolute",
        "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
    });
	return this;
	}
	$("div.target:nth-child(1)").center(true);
	$("div.target:nth-child(2)").center(false);
})


function getReservations() {
  moment.locale('ru')
  $.getJSON(hostUrl + '/api/v1/reservations.json', {auth_token: currentUser.auth_token}, function(json) {
    $('#reserve_table_body').empty()
    _.each(json, function(reserv) {
      var visit_date = moment(reserv.visit_date).format('DD MMMM YYYY HH:mm')
      var reserv_el = '<tr data-id='+reserv.id+'><td><h6 style="color:'+reserv.lounge.color+';" >'+ reserv.lounge.title
      +'</h6></td><td class="td-date">'+visit_date+'</td><td>Скоро<br><span class="color-orange cancel_reserv">Отменить</span></td></tr>';
      $('#reserve_table_body').append(reserv_el)
    })

  });
  $(document).on('click', '.cancel_reserv', function(e) {
    $(this).closest('tr').remove()
    $.ajax({
      url: hostUrl + '/api/v1/reservations/'+$(this).closest('tr').data('id'),
      data: {auth_token: currentUser.auth_token},
      type: 'DELETE'
    })
  })
}
