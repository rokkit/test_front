var fx = new FX(fxa.dashboard);
var currentUser = JSON.parse(localStorage.getItem('currentUser'));

$(function() {

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

        $('#visit_table_body').empty()
        _.each(json.payments, function(payment) {
          var visit_date = moment(payment.visit_date).format('DD MMMM YYYY HH:mm')

          var visit_date = moment(payment.created_at).format('DD MMMM YYYY HH:mm')
          var el = '<tr data-id='+payment.id+'><td><h6 style="color:#6CB9DD;" >Либерти\
          </h6></td><td class="td-date">'+visit_date+'</td><td>444</td></tr>';
          $('#visit_table_body').append(el)
        })

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

    $('input[name="visit_date"]').on('click', function() {
      $(this).val(moment().format('YYYY-MM-DD'))
    })

    function bodyClickOff(){
      $('body').off('click');
      $('#reserv_succes_form').css('right', '1600');
    }

  	$('#n_o_a').click(function(e){
      TweenLite.to('section.error_tooltip', 0, {opacity: 0});
      fx.do(['reserv', 'background'], bodyClick, bodyClickOff);
  	});

    var currentTime = new Date()
    var times = $('select[name="visit_time"]').html()
    var time_options = $(times).filter(function(index) {
      return $(this).data('time') > (currentTime.getHours().toString()+currentTime.getMinutes().toString());
    })
    $('select[name="visit_time"]').html(time_options)
    // $('select[name="visit_date"]').on('change', function() {
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

    $('#reserv_form').submit(function(e){
      e.preventDefault();
      $('.wrong').removeClass('wrong');
      if(!$('input[name=visit_date]').val()) {
        TweenLite.to('section.error_tooltip', 1, {opacity: 1});
        $('input[name="visit_date"]').addClass('wrong')
        return
      }
      if($('select[name=visit_time]').val() == 'время') {
        TweenLite.to('section.error_tooltip', 1, {opacity: 1});
        $('select[name="visit_time"]').addClass('wrong')
        return
      }
      var visit_date = $('input[name=visit_date]').val()
      var visit_time = $('input[name=visit_time]').val()
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
            TweenLite.to('section.error_tooltip', 1, {opacity: 1});
            $('input[name="visit_date"]').addClass('wrong')
            $('select[name="visit_time"]').addClass('wrong')
          }
          if (json.errors.table) {
            TweenLite.to('section.error_tooltip', 1, {opacity: 1});
            $('input[name="lounge"]').addClass('wrong')
          }
        } else {
          $('#visit_date_result').text(visit_date)
          $('#visit_time_result').text(visit_time)
          getReservations();
          fx.swap('reserv', 'reserv_succes_form');
        }

      })

    });

    $('#reserv_succes_form').submit(function(e){
      //animateRevers();
      fx.back();
      e.preventDefault();
    });

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
      $('#achivka h2').text(achiv.find('h6').text())
      $('#achivka p').text(achiv.attr('data-description'))
      $('#achivka img').attr('src', (achiv.find('img').attr('src')))
      fx.do(['achiv', 'background'], bodyClick, bodyClickOff);
      //bodyClick();
    });

    $(document).on('click', '#skills figure', function(){
      var skill = $(this)
      $('#achivka h2').text(skill.find('h6').text());
      $('#achivka p').text(skill.attr('data-description'));
      $('#achivka img').attr('src', (skill.find('img').attr('src')));
      fx.do(['skill', 'background']);
      //bodyClick();
    });


});

$(function(){
  $('.popup').click(function(event){
    event.stopPropagation();
  });

  $('.popup_vertical').click(function(e){
    e.stopPropagation();
  });

  $('#reserv_succes_form').click(function(event){
    event.stopPropagation();
  });
});

$(function(){
  // $(document).on('click', '#all_ach figure', function(){
  //
  //   var achiv = $(this)
  //   $('#achivka h2').text(achiv.find('h6').text())
  //   $('#achivka p').text(achiv.attr('data-description'))
  //   $('#achivka img').attr('src', (achiv.find('img').attr('src')))
  //   animateAchivka();
  //   animateAchivBG();
  //   //bodyClick();
  // });
})

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

var animation = {
  level: 0,
  body: {},
  reserv: {},
  success: {},
  achiv: {},
  talents: {},
  achivka: {},
  achivBG: {},
  isBody: true
};

function animateSuccess(){
  animation.success = new TimelineLite()
  .to('#reserv_succes_form', 1, {right:"0px", 'pointer-events':"auto"}, 'sequence');
  animation.level = 2;
  e.preventDefault();
}

function ReservSuccessForm(){
  TweenLite.to('#reserv_form', 1, {left:"1860px", 'pointer-events':"auto"}, 'sequence');
  animateSuccess();
}

function animateRevers(){
  switch (animation.level) {
    case 1:
      TweenLite.to('#reserv_form', 1, {left:"1860px", 'pointer-events':"auto"}, 'sequence');
      animation.level = 'none';
      break;
    case 2:
      TweenLite.to('#reserv_succes_form', 1, {right:"-1260px", 'pointer-events':"auto", onComplete:function(){$('#reserv_succes_form').css('right', '3000px')}}, 'sequence');
      animation.level = 'none';
      break;
    case 'achivka':
      achivkaReverse();
      animation.level = 'none';
      break;
    case 'achiv':
      achivReverse();
      animation.level = 'none';
      break;
    case 'achivBG':
      achivkaReverse();
      animation.achivBG.reverse();
      animation.level = 'achiv';
      break;
  }


  if(animation.level === 'none'){
    TweenLite.to('body', 0, {'overflow': 'auto'});
    animation.body.reverse();
    var errTooltip = $('section.error_tooltip').css('opacity');
    if(errTooltip === '1'){
        TweenLite.to('section.error_tooltip', 1, {opacity: 0});
    }
      $('body').off('click');
  }
}

function achivReverse(){
  TweenLite.to('#all_ach', 1, {top:"1800px"});
  //animation.achiv.reverse();
  TweenLite.to('body', 0, {'overflow': 'auto'});
  //animation.body.reverse();
  TweenLite.to('#all_ach_wrapper', 1, {'pointer-events':"none"});
}

//Загрузка ачивок и скилов

function card(){
    var achiv = $(this)
    $('#achivka h2').text(achiv.find('h6').text())
    $('#achivka p').text(achiv.attr('data-description'))
    $('#achivka img').attr('src', (achiv.find('img').attr('src')))
    fx.do(['achiv', 'allAchivBG']);
}

$(function() {
  $.getJSON(window.hostUrl + '/api/v1/achievements.json', {auth_token: currentUser.auth_token}, function(json) {
    $('#achievements').empty()
    $('#all_ach .wrapper_for_ach').empty()
    $('#dashboard_ach_btn').text(0+'/'+json.length)
    $.each(json, function(i) {
      var template = "<figure onclick='card()' data-description='"+this.description+"'><img class='achievments_icon' src='"+window.hostUrl+this.image+"'><ficapation><h6>"+this.name+"</h6><p>21.09.15</p></ficapation></figure>";
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
      +'</h6></td><td class="td-date">'+visit_date+'</td><td><span class="color-orange cancel_reserv">Отменить</span></td></tr>';
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
