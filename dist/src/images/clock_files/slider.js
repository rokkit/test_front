$(window).load(function(){

  var bg = document.getElementById("bg");
  var fg = document.getElementById("fg");
  var one = document.getElementById("one");
  var two = document.getElementById("two");
  var three = document.getElementById("three");
  var three = document.getElementById("three");
  var fourth = document.getElementById("fourth");
  var five = document.getElementById("five");
  var txt = document.getElementById("text");

  one.addEventListener("click", function() {
    TweenLite.to(bg, 1.5, {css:{left: "0px"}});
    TweenLite.to(fg, 1.5, {css:{left: "0px"}});
    TweenLite.to(txt, 1.5, {css:{left: "-340px"}});
  });

  two.addEventListener("click", function() {
    TweenLite.to(bg, 1.5, {css:{left: "-200px"}});
    TweenLite.to(fg, 1.5, {css:{left: "-600px"}});
    TweenLite.to(txt, 1.5, {css:{left: "-1740px"}});
  });

  three.addEventListener("click", function() {
    TweenLite.to(bg, 1.5, {css:{left: "-400px"}});
    TweenLite.to(fg, 1.5, {css:{left: "-1200px"}});
    TweenLite.to(txt, 1.5, {css:{left: "-3140px"}});
  });
  fourth.addEventListener("click", function() {
    TweenLite.to(bg, 1.5, {css:{left: "-600px"}});
    TweenLite.to(fg, 1.5, {css:{left: "-1800px"}});
    TweenLite.to(txt, 1.5, {css:{left: "-4540px"}});
  });
  five.addEventListener("click", function() {
    TweenLite.to(bg, 1.5, {css:{left: "-800px"}});
    TweenLite.to(fg, 1.5, {css:{left: "-2400px"}});
    TweenLite.to(txt, 1.5, {css:{left: "-5940px"}});
  });
});