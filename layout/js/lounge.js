window.hostUrl = 'http://176.112.194.149:81';

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
// if(typeof google !== 'undefined'){
//   (function(){
//     var mapProp = {
//         center:new google.maps.LatLng(59.940477, 30.356243),
//         zoom:15,
//         scrollwheel: false,
//         navigationControl: false,
//         mapTypeControl: false,
//         scaleControl: true,
//         draggable: true,
//         mapTypeId:google.maps.MapTypeId.ROADMAP,
//         disableDefaultUI: true
//       };
//
//       var stylez = [{
//           featureType: "all",
//           elementType: "all",
//           stylers: [{ saturation: -100 }]
//         }];
//
//       var marker = new google.maps.Marker({
//           position: new google.maps.LatLng(59.940477,30.356243)
//           //animation:google.maps.Animation.BOUNCE
//       });
//
//       var map = new google.maps.Map(document.getElementById("liberty_block5"),mapProp);
//       marker.setMap(map);
//       map.setOptions({styles: stylez});
//   })();
// }

//template rendering
_.templateSettings =  {
  interpolate :/\{\{(.+?)\}\}/g
}
$(function() {
  var template = _.template($('#page_tpl').html())
  var hmasterTemplate = _.template($('#hmaster_tpl').html())

  var loungeId = window.location.search.substring(1).split('=')[1];
  $.getJSON(hostUrl + '/api/v1/lounges/'+loungeId+'.json', {},function(json) {
    $('title').text(json.title)
    var css = '.lounges_block_1 section.content section.actions button:hover { background: '+json.color+'; }'
    +  ' section.lounges_block_7 .wrapper_sun_text button:hover { background: '+json.color+'; }' + ' ' +
    ' .lounges_block_1 section.blazon .blazon_glow_2 { \
      background-image: -moz-radial-gradient(200px 200px, '+json.color+', rgba(255, 255, 255, 0)); \
      background-image: -webkit-radial-gradient(200px 200px, '+json.color+', rgba(255, 255, 255, 0)); \
      background-image: radial-gradient(200px 200px, '+json.color+', rgba(255, 255, 255, 0)); \
 } ' + ' ' +
  '.lounges_block_1 section.blazon .blazon_glow { \
  background-image: -moz-radial-gradient(512px 512px, '+json.color+', rgba(255, 255, 255, 0)); \
  background-image: -webkit-radial-gradient(512px 512px, '+json.color+', rgba(255, 255, 255, 0)); \
  background-image: radial-gradient(512px 512px, '+json.color+', rgba(255, 255, 255, 0));}'

    head = document.head || document.getElementsByTagName('head')[0];
    style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);

    $('body').html(template(json))

    _.each(json.hookmasters, function(hmaster) {
      $('.wrapper_hm_cards').append(hmasterTemplate({lounge_slug: json.slug, name: hmaster.name, lounge: json.title}))
    })

    _.each(json.photos, function(photo) {
      $('.cd-slider-nav ul').append('<li><img class="img-nav pointer" src="'+ hostUrl + photo.image +'"></li>')
      $('.cd-hero-slider').append('<li><img class="img-slider" src="'+ hostUrl + photo.image +'"></li>')
    })
    $('.cd-slider-nav ul li:first').addClass('selected')


    headerView()
    menuView()
    mapView(json.lat, json.lng)
    sliderMainView()
    //preloader
    var html_body = document.getElementById("main_content")
    TweenLite.to(html_body, 1, {opacity:1})
  });
});
