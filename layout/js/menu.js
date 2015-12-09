$(function() {
  //Клик на кнопку меню в хедере
  $('#menu_header_btn').on('click', function() {
   animateMenu()
  });
  //Переходы по страницам меню
    $('#lounges_nav_btn').on('click', function() {
      document.location.href = '/pages_index.html'
    });
    $('#philosophy_nav_btn').on('click', function() {
      document.location.href = '/pages_philosophy.html'
    });
    $('#community_nav_btn').on('click', function() {
      document.location.href = '/pages_community.html'
    });
});

function animateMenu() {
  var left_part = document.getElementById("menu_left_part")
  var right_part = document.getElementById("menu_right_part")
  var html_body = document.getElementById("html_body")
  var color_overlay = document.getElementById("color_overlay")
  var main_content = document.getElementById('main_content')
  var wrapper =document.getElementById('wrapper_menu')

  var tw1 = TweenLite.to(left_part, 0.5, {left:"0", onComplete: function() {
    $('#closing').on('click', function(e) {
      window.tl.reverse()
    });
  }})
  var tw2 = TweenLite.to(right_part, 0.5, {right:"0"})
  var tw3 = TweenLite.to(color_overlay, 1, {opacity:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"})
  var tw4 = TweenLite.to(main_content, 1, {filter:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"})
  var tw5 = TweenLite.to(html_body, 1, {overflow:"hidden"})
  var tw6 = TweenLite.to(wrapper, 1, {'pointer-events':"auto"})
  window.tl = new TimelineLite().add([tw1,tw2,tw3, tw4, tw5, tw6], 'sequence');
}
