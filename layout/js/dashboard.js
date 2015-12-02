var currentUser = JSON.parse(localStorage.getItem('currentUser'))
$(function() {

    var picker = new Pikaday(
    {
        field: document.getElementById('datepicker'),
        firstDay: 1,
        minDate: new Date(2000, 0, 1),
        maxDate: new Date(2020, 12, 31),
        yearRange: [2000,2020]
    });

  // Hamburger
  new svgIcon(
    document.querySelector('#menu_header_btn'),
    svgIconConfig,
    { easing : mina.easein, evtoggle : 'mouseover', size : { w : 34, h : 34 } }
  );

  //Работа с сервером
  window.hostUrl = 'http://176.112.194.149:81'
  // window.hostUrl = 'http://localhost:3000'

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
        $('select[name="lounge"] option:last').attr("selected", "selected");
        // var tables = $('select[name="table"]').html()
        // $('select[name="lounge"]').on('change', function() {
        //
        //   var lounge = $('select[name="lounge"]').val()
        //   console.log('change', tables)
        //   var options = $(tables).filter("optgroup[data-id="+lounge+"]").html()
        //   if (options) {
        //     $('select[name="table"]').html(options)
        //   } else {
        //     $('select[name="table"]').empty()
        //   }
        // });

      });
      getReservations();

      $.getJSON(hostUrl + '/api/v1/users/' + currentUser.id + '.json', {auth_token: currentUser.auth_token}, function(json) {
          var exp = parseInt(json.exp)
          var need_exp_to_levelup = 5000 - exp
          $('.progress_bar p span').text(need_exp_to_levelup)
          var percentsExp = 0
          if(exp != 0) {
              percentsExp = parseInt(5000 / (exp * 100))
          }
          $('.progress').css('width', percentsExp + '%' )
      })
    });

    // $('input[name="visit_date"]').on('click', function() {
    //   $(this).val(moment().format('YYYY-MM-DD'))
    // })

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
      $('.wrong').removeClass('wrong')
      if(!$('input[name=visit_date]').val()) {
        $('input[name="visit_date"]').addClass('wrong')
        return
      }
      if($('select[name=visit_time]').val() == 'время') {
        $('select[name="visit_time"]').addClass('wrong')
        return
      }

      $.post(hostUrl + '/api/v1/reservations.json', {
        auth_token: currentUser.auth_token,
        lounge: $('select[name=lounge]').val(),
        table_id: $('select[name=table]').val(),
        client_count: $('select[name=client_count]').val(),
        duration: $('select[name=duration]').val(),
        visit_date: $('input[name=visit_date]').val() + ' ' + $('select[name=visit_time]').val()
      }, function(json) {
        if (json.errors) {
          if (json.errors.visit_date) {
            $('input[name="visit_date"]').addClass('wrong')
            $('select[name="visit_time"]').addClass('wrong')
          }
          if (json.errors.table) {
            $('input[name="lounge"]').addClass('wrong')
          }
        } else {
          // $('#reserv_succes_form')
          getReservations()
          ReservSuccessForm();
        }

      })

    });

    $('#reserv_succes_form').submit(function(e){
      animateRevers();
      $('#reserv_succes_form').click(function(event){
        event.stopPropagation();
      });
      e.preventDefault();
    });


    //Открытие всех достижений
    $('#dashboard_ach_btn').click(animateAchiv);

    $('#all_ach a').click(achivReverse);

    $('#all_talents a').click(talentsReverse);

    // Открытие всех навыков
    $('#dashboard_talents_btn').click(animateTalents);
    // Открытие достижения
    $(document).on('click', '#achievements figure',function() {
      var achiv = $(this)
      $('#achivka h2').text(achiv.find('h6').text())
      $('#achivka p').text(achiv.attr('data-description'))
      $('#achivka img').attr('src', (achiv.find('img').attr('src')))
      animateAchivka();
      bodyClick();
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

var animation = {
  level: 0,
  body: {},
  reserv: {},
  success: {},
  achiv: {},
  talents: {},
  achivka: {}
};

function animateBG(){
  animation.body = new TimelineLite()
  .to('.color_overlay', 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"}, 'sequence')
  .to('#main_content', 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"}, 'sequence');
  TweenLite.to('body', 0, {overflow:"hidden"});
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
  switch (animation.level) {
    case 1:
      TweenLite.to('#reserv_form', 1, {left:"1860px", 'pointer-events':"auto"}, 'sequence');
      break;
    case 2:
      TweenLite.to('#reserv_succes_form', 1, {right:"-1260px", 'pointer-events':"auto", onComplete:function(){$('#reserv_succes_form').css('right', '3000px')}}, 'sequence');
      break;
    case 3:
      achivkaReverse();
      break;
  }
  TweenLite.to('body', 0, {'overflow': 'auto'});
  animation.body.reverse();

  //$('body').css('overflow', "visible");
  $('body').off('click');
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
  TweenLite.to('body', 0, {'overflow': 'auto'});
  animation.body.reverse();
  TweenLite.to('#all_ach_wrapper', 1, {'pointer-events':"none"});
}

function talentsReverse(){
  animation.talents.reverse();
  TweenLite.to('body', 0, {'overflow': 'auto'});
  animation.body.reverse();
  TweenLite.to('#all_ach_wrapper', 1, {'pointer-events':"none"});
}

function animateAchivka(){
  animation.achivka = new TimelineLite()
  .to('#achivka', 0.5, {top:"0"});
  animateBG();
  animation.level = 3;
}

function achivkaReverse(){
  animation.achivka.reverse();
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
    json = json.slice(0, 5)

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
