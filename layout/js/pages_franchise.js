var hostUrl = 'http://176.112.194.149:81';
var hostUrlLocal = 'http://localhost:3000';
// Открытие попапа
$(function () {
  var franchise_popup = new TimelineMax({ paused: true });
  franchise_popup.from('#frn_b6', 0.01, { autoAlpha: 0 });
  franchise_popup.to('#frn_b6', 0.01, { autoAlpha: 1 });
  franchise_popup.to('#html_body', 0.01, { overflow: 'hidden' });
  $('.open_franchise_popup').click(function () {
    franchise_popup.play();
  });
  franchise_popup.to('#color_overlay', 0.5, {
    opacity: '0.8',
    '-webkit-opacity': '1',
    'pointer-events': 'auto'
  });
  franchise_popup.to('.wrapper_form', 1, {
    top: '160px',
    ease: Power4.easeOut,
    onComplete: function () {
      $('body').on('click', function (e) {
        console.log('body click');
        franchise_popup.reverse();
        $('body').off('click');
      });
      $('.wrapper_form').click(function (e) {
        e.stopPropagation();
      });
    }
  });
  // $(".cross_white_popup").click(function() {
  //   franchise_popup.reverse();
  //   });
  $('#frn_b6 form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.post(hostUrl + '/franchise_requests.json', data, function () {
      franchise_popup.reverse();
    });
  });
});
$(function () {
  $('.srcoll_to_next').click(function () {
    $('html, body').animate({ scrollTop: $('#frn_b2').offset().top }, 900);
  });
  $('#total_payment_input').keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
      //display error message
      return false;
    }
  });
  //Слайдер
  $('.franchisor_review:first').addClass('review-active');
  $('.left_arrow').click(function () {
    var $next = $('.franchisor_review.review-active').removeClass('review-active').prev('.franchisor_review');
    if ($next.length) {
      $next.addClass('review-active');
    } else {
      $('.franchisor_review:last').addClass('review-active');
    }
  });
  $('.right_arrow').click(function () {
    var $next = $('.franchisor_review.review-active').removeClass('review-active').next();
    if ($next.length) {
      $next.addClass('review-active');
    } else {
      $('.franchisor_review:first').addClass('review-active');
    }
  });
});
