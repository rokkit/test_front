$(function() {
//Работа с сервером
var currentUser = JSON.parse(localStorage.getItem('currentUser'))
  if (currentUser) {
      $('section.username h1').text(currentUser.name)
      $('#login_btn').text(currentUser.name)
  }
});
