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
    reserv:{
      element: '#reserv_form',
      options: {left:"160px", 'pointer-events':"auto"}
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
