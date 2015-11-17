'use strict';

import Handlebars from 'handlebars';

//I18n = require('utils/i18n');
//NumFormat = require('system/libs/num_format');  


/**
 * Функция загружает массив данных и выполняет callback после всех загруженных
 * @param  {array}   	datas    Массив с путями изображений
 * @param  {array}   	objects  ПУстой глобальный массив для сохранения объектов
 * @param  {Function} 	callback Ответная функция после загрузки всех нужных изображений
 * @return {Void}       Заполняет массив object новыми объектами с изображениями и выполняет callback
 */
var preloadObjects = function(datas, objects, callback) {
    var i, j, obj, ref, remaining, results;
    remaining = datas.length;
    results = [];
    for (i = j = 0, ref = remaining; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        obj = document.createElement('object');
        obj.setAttribute('data', datas[i]);
        obj.addEventListener('load', function() {
            --remaining;
            if (remaining <= 0) {
                return callback();
            }
        });
        document.getElementById('loader').appendChild(obj);
        results.push(objects.push(obj));
    }
    return results;
};

/**
 * #Returns true if it is a DOM node
 * @param  {mixed}  	o mixed data for check
 * @return {Boolean}   	if 'o' is dom node -> TRUE else FALSE
 */
var isNode = function(o) {
    if (typeof Node === 'object') {
        return o instanceof Node;
    } else {
        return o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string';
    }
};

/**
 * Returns true if it is a DOM element
 * @param  {mixed}  'o' mixed data for check
 * @return {Boolean}   if 'o' is dom element -> TRUE else FALSE
 */
var isElement = function(o) {
    if (typeof HTMLElement === "object") {
        return o instanceof HTMLElement;
    } else {
        return o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
    }
};
var isString = function(variable) {
    return typeof variable === "string";
};
var isArray = function(variable) {
    return Array.isArray(variable);
};
var isFunction = function(functionToCheck) {
    var getType;
    getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

/**
 * Прооверяет obj на пустоту
 * @param  {mixed} переменная для проверки на пустоту
 * @return {Boolean}
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
var isEmpty = function(obj) {
    var key;
    if (obj === null) {
        return true;
    }
    if (obj.length > 0) {
        return false;
    }
    if (obj.length === 0) {
        return true;
    }
    for (key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
};
var addClass = function(el, className) {
    if (el.classList != null) {
        return el.classList.add(className);
    } else {
        return el.classList += ' ' + className;
    }
};
var removeClass = function(el, className) {
    var reg;
    if (el.classList) {
        return el.classList.remove(className);
    } else {
        reg = new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');
        return el.className = el.className.replace(reg, ' ');
    }
};
var addEvent = function(el, eventName, callback) {
    if (el.addEventListener) {
        return el.addEventListener(eventName, callback, false);
    } else if (el.attachEvent) {
        console.log('Attach event');
        return el.attachEvent('on' + eventName, callback);
    }
};
var randomInteger = function(min, max) {
    var rand;
    rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    return rand;
};
var findAttr = function(selector, findin) {
    var allElements, arr, attr, attrValue, elemAttr, i, j, matchingElements, ref;
    matchingElements = [];
    allElements = findin != null ? findin : document.getElementsByTagName('*');
    arr = selector.split('=');
    if (arr.length > 1) {
        attr = arr[0];
        attrValue = arr[1];
    } else {
        attrValue = arr[0];
    }
    for (i = j = 0, ref = allElements.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        if (attr != null) {
            elemAttr = allElements[i].getAttribute(attr);
            if (elemAttr != null) {
                if (elemAttr === attrValue) {
                    matchingElements.push(allElements[i]);
                }
            }
        } else {
            console.error("Неправильный формат параметра переданного в функцию");
        }
    }
    return matchingElements;
};
var getHashValue = function(key) {
    var matches;
    matches = location.hash.match(new RegExp(key + '=([^&]*)'));
    if (matches) {
        return matches[1];
    } else {
        return null;
    }
};

/**
 * Хелпер для интернационализации
 * @param  {String}     Ключ для поиска перевода
 * @return {string}     Найденный перевод в словаре
 * @author  Aleksandr Vasilenko <info@acset.ru>
 */
Handlebars.registerHelper('I18n', function(str) {
    if (typeof I18n !== 'undefined') {
        return I18n.t(str);
    } else {
        return str;
    }
});

/**
 * Хелпер для форматирования цен
 * @param  {int}        Цена
 * @return {string}     Форматированную цену с валютой
 * @author  Aleksandr Vasilenko <info@acset.ru>
 */
Handlebars.registerHelper('PRICE', function(price) {
    return NumFormat(price) + ' руб.';
});

/**
 * Хелпер для форматирования чисел
 * @param  {int}        Число
 * @return {string}     Форматированное число
 * @author  Aleksandr Vasilenko <info@acset.ru>
 */
Handlebars.registerHelper('NUM', function(num) {
    return NumFormat(num);
});

/**
 * Хелпер для склонения существительных
 * @param  {int}        Число
 * @param  {str}        Ключ для поиска в словаре I18n
 * @return {str}        Число с существительным
 * @author Aleksandr Vasilenko <info@acset.ru>
 */
Handlebars.registerHelper('PLURAL', function(num, key) {
    var number, plural, result;
    number = Math.abs(num);
    plural = Handlebars.helpers.I18n(key);
    result = void 0;
    number %= 100;
    if (number >= 5 && number <= 20) {
        result = plural.five;
    } else {
        number %= 10;
        if (number === 1) {
            result = plural.one;
        } else if (number >= 2 && number <= 4) {
            result = plural.two;
        } else {
            result = plural.five;
        }
    }
    return num + ' ' + result;
});

Handlebars.registerHelper('HTML::image', function(image) {
    var host;
    host = app.configs.paths.images !== 'undefined' ? app.configs.paths.images : '/images/';
    return host + image;
});

export {preloadObjects , isElement , isString , isArray , isFunction , isEmpty , addClass , removeClass , addEvent , randomInteger , findAttr , getHashValue};