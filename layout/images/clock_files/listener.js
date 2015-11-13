/**
 * Утилита для установки прослушки событий системы
 * @return Marionette.Object object
 * @author Pavel Tretyakov <tretyakovpavel.ru@gmail.com>
 * @copyright 2015
 */
define(function(require){
	'set strict';

	DEBUG = true;

	var Marionette 	= require('marionette');
	//require('clockpicker');
	require('backbone-validation');

	// Описываем объект
	var Listener 	= Marionette.Object.extend({
		/**
		 * Параметр, который содержит идентификаторы прослушивателей (предотвращает установку одних и тех слушайтелей)
		 * @type {Array}
		 */
		ids : [] ,

		/**
		 * Параметр в который передаются параметры слушателей , которые устанавливаются после загрузки парамтеров пользователей
		 * @type {Object}
		 */
		plugins	: {
			/**
			 * Слушает появление плагина поповера часов и скрывает их при сколле и/или изменении размера окна
			 * @type {String}
			 */
			//hideClockpicker 	: 'hideClockpicker' ,
			backboneValidation 	: 'initBackboneValidation'
		} ,

		/**
		 * Инциалзиация объекта. Стандартный метод Marionette.Object
		 * @param  {[type]} options [description]
		 * @return {[type]}         [description]
		 */
		initialize 	: function(options){

			// Если в передаваемы
			if('closest' in options){
				this.closestClick(options.closest);
			}

			// Запускаем прослушки системы
			this.initPluginsListeners();

		} ,

		initPluginsListeners : function(){
			for(plugin in this.plugins){
				if(this.plugins[plugin] in this){
					this[this.plugins[plugin]]();
				}
			}
		} ,

		/**
		 * Функция устанавливает прослушку изменения размера на window и выполняет необходимый метод
		 * @param {object} содержит необходимые данные для метода
		 */
		setResize : function(data){
			var options = data;
			$(window).resize(function(e){
				if('callback' in options){
					return options.callback(options);
				}
			});
		} ,

		/**
		 * Функция устанавливает прослушку скроллинга у элемента data.target, иначе у $(window) и выполняет метод data.callback
		 * @param {JQuery selector} data.target JQuery элемент для прослушки скроллинга
		 * @param {function} data.callback функция выолняемая после скроллинга
		 * @default target = $(window)
		 */
		setScroll : function(data){
			var options = data;
			var target 	= ('target' in data) 	? data.target 	: $(window);

			if('callback' in options){
				target.scroll(function(){
					if(DEBUG)console.info('Произошел скроллинг у тега ' , target.get(0).tagName);
					return options.callback(options);
				});
			}
		} ,

		/**
		 * Метод инициализируется при старте системы с колбэками, которые не имеют динамических данных (модели определенных объектов и т.п)
		 * @param options {object} : Параметр со списком селекторов на которые нужно поставить клик
		 * @return {void}
		 */
		closestClick : function(options){
			// Слушаем тык по документу
			$(document).mousedown(function(e) {

				// Перебираем элементы переданных параметров
				for(task in options){
					// Устанавливаем прслушку
					this.setClosest(options[task]);
				}

			});
		} ,

		/**
		 * Публичный метод
		 * @param {object data} : data.id , data.title , data.selector , data.callback
		 * @param {string|int} data.id Идентификатор прослушки, неообходим чтобы не устанавливать повторные прослушки
		 * @param {string} data.title Необязательный параметр для вывода в консоль
		 * @param {string} data.selector Строка с css селектором, который будет прослушиться
		 * @param {function} data.callback Обратная функция, которая выполняется при условии, что клик выполнен не на указанный элемент
		 * @param {mixed} mixed В объект можно передать дополнительные параметры, чтобы вызвать в callback функции
		 */
		setClosest : function(data){
			if('id' in data){
				if(data.id in this.ids){
					if(DEBUG)console.log('Устанавливается прослушка на существующий элемент')
				}else{
					// Добавляем идентификатор слушателя
					this.ids.push(data.id);

					if('title' in data){
						if(DEBUG)console.info('Установлена прослушка клика на ' , data.title , ' c параметрами' , data);
					}

					// Слушаем тык по документу
					$(document).mousedown(function(e) {
						// Проверяем есть ли селектор в текущем параметре
						if('selector' in data){
							// Проверяем тыкнули ли по селектору
							if ($(e.target).closest(data.selector).length){
								if (DEBUG) console.log("Тыкунли по элементу");

								// Если тыкнули на элемент , проверяем нужно ли выолнить
								if('callbackOnElement' in data){
									data.callbackOnElement(data);
									console.log('callbackOnElement' , $(e));
								}

								return
							}
							else {								
								if (DEBUG) console.log('ТЫКНУЛИ ВНЕ ЭЕЛЕМЕНТА');
							}
						}

						// Если тыкнули вне элемента , проверяем нужно ли выолнить
						if('callbackOutElement' in data){
							data.callbackOutElement(data);
						}						
					});
				}
			}else{
				if(DEBUG)console.error('Ставится прослушка события без указания идентификатора' , data);
			}
		} ,

		/**
		 * Метод для обработки
		 * @return {[type]} [description]
		 */
		hideClockpicker : function(){

			// Скрываем поповер часов при изменении размеров окна
			this.setResize({
				callback : function(){
					$('.clockpicker-popover').clockpicker().hide();
				}
			});

			// Сркываем поповер при скроллинге главного контента
			this.setScroll({
				target 		: $('.page-content') ,
				callback 	: function(){
					var clock = $('.clockpicker-popover');
					clock.css('display' , 'none');
					//$('.clockpicker input').blur();
					//$('input:first').focus();
				}
			});
		} ,

		/**
		 * Расширяет функцианальность underscore для валидации форм
		 * @return {[type]} [description]
		 */
		initBackboneValidation : function(){
			_.extend(Backbone.Validation.callbacks, {
			    valid: function (view, attr, selector) {
					var $el = view.$('[name=' + attr + ']'), 
					$group = $el.closest('.form-group');

					$group.removeClass('has-error');
					$group.find('.help-block').html('').addClass('hidden');
				},

				invalid: function (view, attr, error, selector) {
					console.log('Invalid!' , attr);
					
					var $el = view.$('[name=' + attr + ']'), 
					$group = $el.closest('.form-group');

					$group.addClass('has-error');
					$group.find('.help-block').html(error).removeClass('hidden');
				} ,

			    messages : {
	    			required: '{0} обязательно'
	    		}
			});
		}
	});

	return Listener;
});
