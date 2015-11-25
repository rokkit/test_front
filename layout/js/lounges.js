$( document ).ready(function() {
    var div = $('.frontside');
    div.each(function(i, v){
      v.pseudoStyle("before","box-shadow","inset rgba(255, 0, 0, .5) 0 0 0 2px");
      v.pseudoStyle("after", "box-shadow", "inset rgba(255, 0, 0, .25) 0 0 0 1px");
    });
});

var UID = {
    _current: 0,
    getNew: function(){
      this._current++;
      return this._current;
    }
  };

  HTMLElement.prototype.pseudoStyle = function(element,prop,value){
    var _this = this;
    var _sheetId = "pseudoStyles";
    var _head = document.head || document.getElementsByTagName('head')[0];
    var _sheet = document.getElementById(_sheetId) || document.createElement('style');
    _sheet.id = _sheetId;
    var className = "pseudoStyle" + UID.getNew();

    _this.className +=  " "+className;
    _sheet.innerHTML += "\n."+className+":"+element+"{"+prop+":"+value+"}";
    _head.appendChild(_sheet);
    return this;
};

$(function(){
  ui.card.render('oblaka', '#65b6dc', 'Резерв', 'Тюмень', '.lounges');
  ui.card.render('academy_novosibirsk', '#5F4D9B', 'Академия', 'Новосибирск', '.lounges');
  ui.card.render('unityhall', 'red', 'Облака', 'Воронеж','.lounges');
  ui.card.render('reserv', 'green', 'Unity Hall', 'Казань','.lounges');
});
