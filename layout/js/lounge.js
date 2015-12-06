

/*
 * Replace all SVG images with inline SVG
 */
// $(function() {
//   $('img.svg').each(function(){
//       var $img = jQuery(this);
//       var imgID = $img.attr('id');
//       var imgClass = $img.attr('class');
//       var imgURL = $img.attr('src');
//
//       jQuery.get(imgURL, function(data) {
//           // Get the SVG tag, ignore the rest
//           var $svg = jQuery(data).find('svg');
//
//           // Add replaced image's ID to the new SVG
//           if(typeof imgID !== 'undefined') {
//               $svg = $svg.attr('id', imgID);
//           }
//           // Add replaced image's classes to the new SVG
//           if(typeof imgClass !== 'undefined') {
//               $svg = $svg.attr('class', imgClass+' replaced-svg');
//           }
//
//           // Remove any invalid XML tags as per http://validator.w3.org
//           $svg = $svg.removeAttr('xmlns:a');
//
//           // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
//           if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
//               $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
//           }
//
//           // Replace image with new SVG
//           $img.replaceWith($svg);
//
//       }, 'xml');
//   });
// });
if(typeof google !== 'undefined'){
  (function(){
    var mapProp = {
        center:new google.maps.LatLng(59.940477, 30.356243),
        zoom:15,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      };

      var stylez = [{
          featureType: "all",
          elementType: "all",
          stylers: [{ saturation: -100 }]
        }];

      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(59.940477,30.356243)
          //animation:google.maps.Animation.BOUNCE
      });

      var map = new google.maps.Map(document.getElementById("liberty_block5"),mapProp);
      marker.setMap(map);
      map.setOptions({styles: stylez});
  })();
}
