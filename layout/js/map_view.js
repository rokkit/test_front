function mapView(lat, lng) {
  var el;
  if($('.lounges_block_5 .map_wrapper').length > 0){
    el = $('.lounges_block_5 .map_wrapper');
  }
  if($('#liberty_block5 .map_wrapper').length > 0){
    el = $('#liberty_block5 .map_wrapper');
  }
  // if(typeof google !== 'undefined' && $('.lounges_block_5 .map_wrapper').length > 0){
  if(typeof google !== 'undefined' && el.length > 0){
    (function(){
      var mapProp = {
          center:new google.maps.LatLng(lat, lng),
          zoom:15,
          scrollwheel: false,
          navigationControl: false,
          mapTypeControl: false,
          scaleControl: true,
          draggable: true,
          mapTypeId:google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          styles: [
            {"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},
            {"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}
          ]
        };

        var map = new google.maps.Map(el[0], mapProp);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map
        });


    })();
  }
}
