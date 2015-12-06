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
    all_ach:{
      element: '#all_ach',
      options: { top: '80px' }
    },
    all_ach_wrapper:{
      element: '#all_ach_wrapper',
      options: { 'pointer-events': 'auto' }
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
        filter: 'blur(5px)',
        "-webkit-filter":"blur(4px)",
        transform: 'scale(0.95, 0.95)',
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
    achiv:{
      element: '#achivka',
      options: {top:"0"}
    },
    background: ['main', 'overlay', 'body']
  }
};
