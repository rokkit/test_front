function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
$(function () {
  window.hostUrl = 'http://176.112.194.149:81';
  $.getJSON(hostUrl + '/api/v1/lounges.json', {}, function (json) {
    var loungeCardTpl = _.template($('#lounge_card_tpl').html());
    _.each(json, function (l) {
      if (l.title != 'Либерти') {
        $('.wrapper_lounges').append(loungeCardTpl({
          id: l.id,
          title: l.title,
          slug: l.slug,
          city: l.city,
          image: l.blazon,
          color: l.color,
          color_rgb: hexToRgb(l.color)
        }));
      } else {
        $('section.lounges .lounge:first').data('id', l.id);
      }
    });
  });
  $(document).on('click', '.lounge', function () {
    document.location.href = '/pages_lounges_template.html?id=' + $(this).data('id');
  });
});