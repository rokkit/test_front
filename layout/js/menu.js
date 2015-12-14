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

    $('#go_admin_from_menu_btn').click(function() {
      if(window.currentUser) {
        if(window.currentUser.role == 'admin') {
          document.location.href = 'http://176.112.194.149:81/admin';
        }
      }
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

//Новости из группы ВК
$(function() {
  VK.init({
    apiId: 5023577
  })
  VK.Api.call('wall.get', {domain: 'libertyfamily', filter: 'owner'}, function(json) {
    json = json.response
    console.log(json)
    var newsHtml = '<h5 data-url="<%= vk_url %>"><%= text %></h5><p><%= date %> в <%= time %> от #unihuqhookahplaces</p>'
    var newsTpl = _.template(newsHtml)
    var news = _.filter(json, function(post) {
      if (_.isObject(post)) {
        return post.text.indexOf('#uhpfamily') > -1 || post.text.indexOf('#uhp') > -1 || post.text.indexOf('#uniquehookahplace') > -1
      }
    })

    news = news.splice(0, 5)
    $('#menu_left_part span').empty()
    _.each(news, function(n) {

        var end_of_string_index = 0;
        var newsText = strip(n.text).replace('<h5>', '').replace('</h5>', '')
        if (newsText.indexOf('!') > -1) {
          end_of_string_index = newsText.indexOf('!');
        } else if (newsText.indexOf('?') > -1) {
          end_of_string_index = newsText.indexOf('?');
        } else if (newsText.indexOf('.') > -1) {
          end_of_string_index = newsText.indexOf('.');
        }
        newsText = newsText.substring(0, end_of_string_index)
        var vk_url = 'https://vk.com/libertyfamily?w=wall' + n.from_id + '_' + n.id;
        var newsEl = newsTpl({text: newsText, date: '12.04.2015', time: '12:30', vk_url: vk_url})
        $('#menu_left_part span').append(newsEl)
    })

  });
  $(document).on('click', 'h5', function() {
    document.location.href = $(this).data('url');
  });
});

function strip(html){
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}
