import 'Marionette' from 'Backbone.Marionette';
import 'jquery-ui';

'use strict';
var Marionette, Scrollfade;

var indexOf = [].indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
    }
    return -1;
};

export default Marionette.Behavior.extend({
  elements: [],
  debug   : false,
  defaults: { animation: { effect : 'bounce', direction : 'right', time : 1000, type : 'show' } },
  ui      : { 'FadeTargets': '.js-scrollfade' } ,
  
  events  : { "click @ui.FadeTargets": 'showTestMessage' } ,
  showTestMessage : function(e) { return this.play(e.currentTarget); }

  /**
   * Метод отрабатывает при появляении страницы, можно сказать старт
   * @return Void
   */
  onShow: function() {
      this.prepareElements();
      return this.listenEvents();
  },

  /**
   * Метод устанвливает прослушку на необходимые события
   * @return Void
   * @param Function action - параметр указывает обработчик при срабатывания события
   */
  listenEvents(){
      var _this, setBottomScrollEvent;
      _this = this;
      setBottomScrollEvent = function(element) {
          return $(window).scroll(function() {
              var bottom_of_object, bottom_of_window;
              bottom_of_object = element.data.topJS;
              bottom_of_window = $(window).scrollTop() + $(window).height();
              if (this.debug) {
                  console.log('BOTTOM', bottom_of_window, bottom_of_object);
              }
              if (bottom_of_window > bottom_of_object) {
                  return _this.play(element);
              }
          });
      };
      return _this.handleElements(setBottomScrollEvent);
  },

  /**
   * Метод делает анимацию элемента необходимым способом
   * @return Void
   */
  play: function(element) {
      switch (element.data.type) {
          case 'hide':
              return element.$el.hide(element.data.effect, element.data);
          case 'show':
              return element.$el.show(element.data.effect, element.data);
      }
  },

  /**
   * Получаем параметры  data-scrollfade-* из тега
   * @return Object data -> объект с параметрами элемента
   */
  getOptions: function(element) {
      var data, tmp;
      data = {};
      tmp = element.el.dataset;
      data.effect = tmp.scrollfadeEffect != null ? tmp.scrollfadeEffect : this.defaults.animation.effect;
      data.direction = tmp.scrollfadeDirection != null ? tmp.scrollfadeDirection : this.defaults.animation.direction;
      data.duration = tmp.scrollfadeTime != null ? parseInt(tmp.scrollfadeTime) : this.defaults.animation.time;
      data.type = tmp.scrollfadeType != null ? tmp.scrollfadeType : this.defaults.animation.type;
      data.topJS = element.$el.offset().top;
      if (this.debug) {
          console.log('DATA', data);
      }
      return data;
  },
    
  handleElements: function(callbacks) {
      var HandleDebug, i, j, n, ref, results;
      HandleDebug = false;
      if (!this.elements.length) {
          this.prepareElements();
      }
      if (this.elements.length > 0) {
          results = [];
          for (i = j = 0, ref = this.elements.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
              if (isFunction(callbacks)) {
                  if (HandleDebug) {
                      console.log('behaviors/scrollfade.handleDebug(): This is [FUNCTION] callback');
                  }
                  results.push(callbacks(this.elements[i]));
              } else if (isArray(callbacks)) {
                  if (HandleDebug) {
                      console.log('behaviors/scrollfade.handleDebug(): This is [ARRAY] callbacks');
                  }
                  results.push((function() {
                      var results1;
                      results1 = [];
                      for (n in callbacks) {
                          if (!callbacks.hasOwnProperty(i)) {
                              continue;
                          }
                          results1.push(callbacks[n](this.elements[i]));
                      }
                      return results1;
                  }).call(this));
              } else if (isString(callbacks) && (callbacks != null) && indexOf.call(this, callbacks) >= 0) {
                  if (HandleDebug) {
                      results.push(console.log('behaviors/scrollfade.handleDebug(): This is [STRING] callback'));
                  } else {
                      results.push(void 0);
                  }
              } else {
                  results.push(void 0);
              }
          }
          return results;
      }
  },

  /**
   * Метод подготавливает элементы перед навешиванием событий
   */
  prepareElements: function() {
      var el, i, j, ref, results;
      this.elements = [];
      if (this.ui.FadeTargets.length > 0) {
          results = [];
          for (i = j = 0, ref = this.ui.FadeTargets.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
              el = {};
              el.el = this.ui.FadeTargets[i];
              el.$el = $(this.ui.FadeTargets[i]);
              el.data = this.getOptions(el);
              this.elements.push(el);

              /*
               * Обрабатываем элемент по типу анимации
               */
              if (el.data.type === 'show') {
                  results.push(this.ShowPrepareElement(el));
              } else {
                  results.push(void 0);
              }
          }
          return results;
      }
  },

  /**
   * Подготовка элемента к появлению
   */
  ShowPrepareElement: function(element) {
      return element.$el.css('display', 'none');
  }

});