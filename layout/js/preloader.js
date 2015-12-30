// PRELOADER
var currentUser = JSON.parse(localStorage.getItem('currentUser'));
$(function () {
  var prealoader_wrapper = document.getElementById('preloader_wrapper');
  var prealoader_eye = document.getElementById('preloader_eye');
  var preloader_back = document.getElementById('preloader_back');
  TweenMax.to(preloader_back, 10, {
    rotation: 360,
    repeat: 8
  });
  TweenMax.staggerFrom('.stagger_gsap', 2, {
    y: 50,
    opacity: 0,
    delay: 0.5,
    ease: Power4.easeOut,
    force3D: true
  }, 0.2);
  if (window.location.search.substring(1) == 'redirect=profile') {
    TweenLite.to(prealoader_wrapper, 1, {
      top: '-100%',
      opacity: 0,
      delay: 4,
      ease: Power4.easeOut,
      onComplete: function () {
        if (currentUser.role == 'hookmaster') {
          document.location.href = '/dashboard_hmaster.html';
        } else {
          document.location.href = '/dashboard_client.html';
        }
      }
    });
  } else {
    TweenLite.to(prealoader_wrapper, 1, {
      top: '-100%',
      opacity: 0,
      delay: 4,
      ease: Power4.easeOut,
      onComplete: function () {
        document.location.href = '/pages_index.html';
      }
    });
  }
});