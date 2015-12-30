// Попапы кальянщиков: Резерв
//......................................................................//
// Первая карточка
$(function () {
  var hm_popup = new TimelineMax({ paused: true });
  hm_popup.to('#html_body', 0.1, { overflow: 'hidden' });
  hm_popup.to('#popup_hm_1', 0.9, {
    top: 0,
    ease: Power4.easeOut
  });
  hm_popup.to('#wrapper_hm_popup', 0.1, { 'pointer-events': 'auto' });
  $('#btn_hm_1').click(function () {
    hm_popup.play();
  });
  $('.cross_white_popup').click(function () {
    hm_popup.reverse();
  });
});
// Вторая карточка
$(function () {
  var hm_popup = new TimelineMax({ paused: true });
  hm_popup.to('#html_body', 0.1, { overflow: 'hidden' });
  hm_popup.to('#popup_hm_2', 0.9, {
    top: 0,
    ease: Power4.easeOut
  });
  hm_popup.to('#wrapper_hm_popup', 0.1, { 'pointer-events': 'auto' });
  $('#btn_hm_2').click(function () {
    hm_popup.play();
  });
  $('.cross_white_popup').click(function () {
    hm_popup.reverse();
  });
});
// Третья карточка
$(function () {
  var hm_popup = new TimelineMax({ paused: true });
  hm_popup.to('#html_body', 0.1, { overflow: 'hidden' });
  hm_popup.to('#popup_hm_3', 0.5, {
    top: 0,
    ease: Power4.easeOut
  });
  hm_popup.to('#wrapper_hm_popup', 0.1, { 'pointer-events': 'auto' });
  $('#btn_hm_3').click(function () {
    hm_popup.play();
  });
  $('.cross_white_popup').click(function () {
    hm_popup.reverse();
  });
});