function menuView() {
  moment.locale('ru')
  String.prototype.regexIndexOf = function(regex, startpos) {
      var indexOf = this.substring(startpos || 0).search(regex);
      return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
  }

  String.prototype.regexLastIndexOf = function(regex, startpos) {
      regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
      if(typeof (startpos) == "undefined") {
          startpos = this.length;
      } else if(startpos < 0) {
          startpos = 0;
      }
      var stringToWorkWith = this.substring(0, startpos + 1);
      var lastIndexOf = -1;
      var nextStop = 0;
      while((result = regex.exec(stringToWorkWith)) != null) {
          lastIndexOf = result.index;
          regex.lastIndex = ++nextStop;
      }
      return lastIndexOf;
  }
  _.templateSettings =  {
    interpolate :/\{\{(.+?)\}\}/g
  }
  $(function() {
    //Клик на кнопку меню в хедере
    $('#menu_header_btn').on('click', function() {

     getVkNews()

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
      $('#franchise_nav_btn').on('click', function() {
        document.location.href = '/pages_franchise.html'
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

  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //Новости из группы ВК
  $(function() {

    VK.init({
      apiId: 5023577
    })
    $('.wrapper_left_menu span').hide()
    getVkNews()
    $(document).on('click', 'h4', function() {
      // document.location.href = $(this).data('url');
      window.open($(this).data('url'), '_blank');
    });
    $(document).on('click', 'h5', function() {
      // document.location.href = $(this).data('url');
      window.open($(this).data('url'), '_blank');
    });
  });

  function strip(html){
     var tmp = document.createElement("DIV");
     tmp.innerHTML = html;
     return tmp.textContent || tmp.innerText || "";
  }

  function getVkNews() {
    $('.wrapper_left_menu span').hide()
    var newsHtml = '<h5 data-url="{{ vk_url }}">{{ text }}</h5><p>{{ date }} в {{ time }} от {{ hashtags }}</p>'
    var firstNewsHtml = '<h4 data-url="{{ vk_url }}">{{ text }}</h4><p>{{ date }} в {{ time }} от {{ hashtags }}</p>'
    var newsTpl = _.template(newsHtml);
    var firstNewsTpl = _.template(firstNewsHtml);
    VK.Api.call('wall.get', {owner_id: '-44475553', domain: 'uhpfamily', filter: 'owner'}, function(json) {

      console.log(json)
      json = json.response
      var news = _.filter(json, function(post) {
        if (_.isObject(post)) {
          return post.text.regexIndexOf(/\#uhp/) > -1 || post.text.indexOf('#uniquehookahplace') > -1
        }
      })

      news = news.splice(0, 5)
      $('#menu_left_part span').empty()
      _.each(news, function(n, i) {

          var dateMoment = moment.unix(n.date)
          var end_of_string_index = 0;

          var newsText = n.text.toLowerCase()
          newsText = capitalizeFirstLetter(newsText)
          var br = newsText.indexOf('<br>')
          var mainHeader = newsText.substring(0, br)

          newsText = newsText.slice(br + 4)
          var secondHeader = newsText.slice(0, newsText.indexOf('<br>'))
          secondHeader = secondHeader.charAt(0).toUpperCase() + secondHeader.slice(1);

          newsText = mainHeader + ' ' + secondHeader
          var vk_url = 'https://vk.com/uhpfamily?w=wall' + n.from_id + '_' + n.id;

          var date = dateMoment.format('LL')
          var time = dateMoment.format('HH:mm')

          var newsEl = null
          if (i == 0) {
            newsEl = firstNewsTpl({text: newsText, date: date, time: time, vk_url: vk_url, hashtags: '#uhp #uhpfamily'})
          } else {
            newsEl = newsTpl({text: newsText, date: date, time: time, vk_url: vk_url, hashtags: '#uhp #uhpfamily'})
          }

          $('#menu_left_part span').append(newsEl)
      })
      $('.wrapper_left_menu span').show()

    });
  }

}
