var fxa = {
  dashboard:{
    defaultTime: 1,
    main:{
      element: '#main_content',
      options: {
        filter: 'blur(5px)',
        '-webkit-filter': 'blur(4px)',
        transform: 'scale(0.95, 0.95)'
      }
    },
    reserv_form:{
      element: '#reserv_form',
      options: {left:"1860px", 'pointer-events':"auto"}
    },
    reserv_succes_form:{
      element: '#reserv_succes_form',
      options: {right:"0px", 'pointer-events':"auto"},
      back: {right:"-1260px", 'pointer-events':"auto"}
    },
    invate_succes_form:{
      element: '#invate_succes_form',
      options: {right:'0px', 'pointer-events':'auto'},
      back: {right: '-1260px', 'pointer-events':'auto'}
    },
    invate_me:{
      element: '#invate_me',
      options: {right:'0px', 'pointer-events':'auto'},
      back: {right: '-1260px', 'pointer-events':'auto'}
    },
    skillBoard:{
      element: '#all_talents',
      options: { top: '80px', 'pointer-events': 'auto' }
    },
    all_ach:{
      element: '#all_ach',
      options: { top: '80px' }
    },
    all_ach_wrapper:{
      element: '#all_ach_wrapper',
      options: { 'pointer-events': 'auto' },
      time: 0
    },
    all_skill_popup:{
      element: '#all_talents .popup_vertical_symbol',
      options: { 'pointer-events': 'none' }
    },
    all_ach_popup:{
      element: '#all_ach .popup_vertical_symbol',
      options: { 'pointer-events': 'none' },
      time: 0
    },
    allAchivBG:{
      element: '#all_ach_wrapper',
      options: {
        opacity: '0.8',
        "-webkit-opacity":"1",
        filter: 'blur(6px)',
        "-webkit-filter":"blur(6px)",
        overflow: 'hidden',
        'pointer-events': 'none'
      }
    },
    skillBG:{
      element: '#all-skill',
      options:{
        opacity: '0.8',
        "-webkit-opacity":"1",
        filter: 'blur(6px)',
        "-webkit-filter":"blur(6px)",
        overflow: 'hidden',
        'pointer-events': 'none'
      }
    },
    allAchiv: ['all_ach', 'all_ach_wrapper', 'all_ach_popup'],
    reserv:{
      element: '#reserv_form',
      options: {
        left:"160px",
        'pointer-events':"auto",
      },
      back: {left:"1860px", 'pointer-events':"auto"}
    },
    invite:{
      element: '#invite_form',
      options: {
        left:"160px",
        'pointer-events':"auto",
      },
      back: {left:"1860px", 'pointer-events':"auto"}
    },
    overlay:{
      element: '.color_overlay',
      options: {
        opacity: '0.8',
        '-webkit-opacity': '1',
        'pointer-events': 'auto'
      }
    },
    editProfile: {
      element: '#edit-profile',
      options: {left: '80px', 'pointer-events': 'auto'}
    },
    editProfileShow: {
      element: '#edit-profile',
      options: { display: 'block' },
      time: 0
    },
    body:{
      element: 'body',
      options: {
        overflow: 'hidden'
      }
    },
    achiv:{
      element: '#achivka',
      options: {top:"0"}
    },
    bonus_detail:{
      element: '#bonus_detail',
      options: {top:"0"}
    },
    skill:{
      element: '#skill',
      options: {top:'0', 'pointer-events': 'auto'}
    },
    code_form:{
      element: '#code_form',
      options: {right:'0px', 'pointer-events':'auto'},
      back: {right:"-1260px", 'pointer-events':"auto"}
    },
    background: ['main', 'overlay', 'body']
  },
  pages_index: {
    defaultTime: 1,
    main: {
      element: '#main_content',
      options: {
        filter: 'blur(5px)',
        '-webkit-filter': 'blur(4px)',
        transform: 'scale(0.95, 0.95)'
      }
    },
    code_form:{
      element: '#code_form',
      options: {right:'0px', 'pointer-events':'auto'},
      back: {right:"-1260px", 'pointer-events':"auto"}
    },
    overlay:{
      element: '.color_overlay',
      options: {
        opacity: '0.8',
        '-webkit-opacity': '1',
        'pointer-events': 'auto'
      }
    },
    body:{
      element: 'body',
      options: {
        overflow: 'hidden'
      }
    },
    login: {
      element: '#login_form',
      options: { 'left': '190px' }
    },
    pass:{
      element: '#pass_form',
      options: {'left': '160px'}
    },
    wrapper_pass:{
      element: '#wrapper_pass',
      options: {'pointer-events': 'auto'},
      time: 0
    },
    wrapper_login:{
      element: '#wrapper_login',
      options:{ 'pointer-events': 'auto' }
    },
    errorTooltip:{
      element: 'section.error_tooltip',
      options: { opacity: 0 }
    },
    signup:{
      element: '#signup_form',
      options: { 'left': '190px' },
      back: {left:"1860px", 'pointer-events':"auto"}
    },
    wrapper_signup: {
      element: '#wrapper_signup'//,
      // options: { 'pointer-events': 'auto' }
    },
    signupPopup: ['signup', 'wrapper_signup'],
    loginPopup: ['login', 'wrapper_login'],
    passPopup: ['pass', 'wrapper_pass'],
    background: ['main', 'overlay', 'body']
  }
};

// Анимация попапа истории

$(function(){

  var history_open_anim = new TimelineMax({paused:true});
  history_open_anim.from("#philosophie_block2_history", 0.1, {autoAlpha:0});
  history_open_anim.to("#philosophie_block2_history", 0.1, {autoAlpha:1});
  history_open_anim.to("#history_wrapper", 1, {top:0, ease: Power4.easeOut});
  history_open_anim.to("#html_body", 0.1, {overflow:"hidden"});

  $("#open_history_btn").click(function() {
    history_open_anim.play();
  });

  $("#close_history_btn").click(function() {
    history_open_anim.reverse();
    });
})


// Анимация попапа на странице кальянщиков
////////////////////////////////////////////////////////

// Филипп Бойцов
$(function(){

  var hm_open_anim = new TimelineMax({paused:true});

  hm_open_anim.from("#hookah_popups", 0.1, {autoAlpha:0});
  hm_open_anim.to("#hookah_popups", 0.1, {autoAlpha:1});

  hm_open_anim.to("#hm_ilya_ponomarev", 1, {top:0, ease: Power4.easeOut});
  hm_open_anim.to("#html_body", 0.1, {overflow:"hidden"});

  $("#open_hm_ilya_ponomarev").click(function() {
    hm_open_anim.play();
  });

  $(".cross_white_popup").click(function() {
    hm_open_anim.reverse();
    });
})

// Филипп Бойцов
$(function(){

  var hm_open_anim = new TimelineMax({paused:true});

  hm_open_anim.from("#hookah_popups", 0.1, {autoAlpha:0});
  hm_open_anim.to("#hookah_popups", 0.1, {autoAlpha:1});

  hm_open_anim.to("#hm_philipp_boicov", 1, {top:0, ease: Power4.easeOut});
  hm_open_anim.to("#html_body", 0.1, {overflow:"hidden"});

  $("#open_hm_philipp_boicov").click(function() {
    hm_open_anim.play();
  });

  $(".cross_white_popup").click(function() {
    hm_open_anim.reverse();
    });
})

// Игорь Коновалов
$(function(){

  var hm_open_anim = new TimelineMax({paused:true});

  hm_open_anim.from("#hookah_popups", 0.1, {autoAlpha:0});
  hm_open_anim.to("#hookah_popups", 0.1, {autoAlpha:1});

  hm_open_anim.to("#hm_igor_konovalov", 1, {top:0, ease: Power4.easeOut});
  hm_open_anim.to("#html_body", 0.1, {overflow:"hidden"});

  $("#open_hm_igor_konovalov").click(function() {
    hm_open_anim.play();
  });

  $(".cross_white_popup").click(function() {
    hm_open_anim.reverse();
    });
})

// Изменение хидера при скроле
//......................................................................//
var cbpAnimatedHeader = (function() {

  var docElem = document.documentElement,
      header = document.getElementById("header"),
      didScroll = false,
      changeHeaderOn = 48;

  function init() {
    window.addEventListener( 'scroll', function( event ) {
      if( !didScroll ) {
        didScroll = true;
        setTimeout( scrollPage, 0 );
      }
    }, false );
  }

  function scrollPage() {

    var sy = scrollY();

    if ( sy >= changeHeaderOn ) {
      $('#header').css({"background": "rgba(40,44,52,0.9", "padding": "16px", "height": "auto"});
    }

    else {
      $('#header').css({"background": "none", "padding": "48px", "height": "40px"});
    }

    didScroll = false;
  }

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  init();

})();
