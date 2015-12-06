$(function(){
  window.hostUrl = 'http://176.112.194.149:81'
  $.getJSON(hostUrl + '/api/v1/lounges.json', {}, function(json) {

    $.each(json, function() {
      if(this.title != 'Либерти') {
        ui.card.render(this.blazon, this.color, this.title, this.city, '.lounges');
      }
    })

  });

  $(document).on('click', '#oblaka-card', function() {
    document.location.href="/oblaka.html"
  })
  $(document).on('click', '#academy_novosibirsk-card', function() {
    document.location.href="/academy_novosibirsk.html"
  })
  $(document).on('click', '#unityhall-card', function() {
    document.location.href="/unityhall.html"
  })
  $(document).on('click', '#reserv-card', function() {
    document.location.href="/reserv.html"
  })
  $(document).on('click', '#liberty-card', function() {
    document.location.href="/pages_lounges_liberty.html"
  })
});
