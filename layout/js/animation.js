var fxa = {
  dashboard:{
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
    skillBoard:{
      element: '#all_talents',
      options: { top: '80px' }
    },
    all_ach:{
      element: '#all_ach',
      options: { top: '80px' }
    },
    all_ach_wrapper:{
      element: '#all_ach_wrapper',
      options: { 'pointer-events': 'auto' }
    },
    all_skill_popup:{
      element: '#all_talents .popup_vertical_symbol',
      options: { 'pointer-events': 'none' }
    },
    all_ach_popup:{
      element: '#all_ach .popup_vertical_symbol',
      options: { 'pointer-events': 'none' }
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
    allAchiv: ['all_ach', 'all_ach_wrapper', 'all_ach_popup'],
    reserv:{
      element: '#reserv_form',
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
    skill:{
      element: '#skill',
      options: {top:'0'}
    },
    background: ['main', 'overlay', 'body']
  },
  pages_index: {
    main: {
      element: '#main_content',
      options: {
        filter: 'blur(5px)',
        '-webkit-filter': 'blur(4px)',
        transform: 'scale(0.95, 0.95)'
      }
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
      options: { 'left': '120px' }
    },
    wrapper_signup: {
      element: '#wrapper_signup',
      options: { 'pointer-events': 'auto' }
    },
    signupPopup: ['signup', 'wrapper_signup'],
    loginPopup: ['login', 'wrapper_login'],
    background: ['main', 'overlay', 'body']
  }
};
