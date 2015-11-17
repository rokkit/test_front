import Marionette from 'backbone.marionette';
import 'system/helpers';
import 'gsap';

export default Marionette.Behavior.extend({
	ui 		: { 'linkTarget' : ['[data-am]'] } ,
	events 	: { 'click @ui.linkTarget' : 'clickTarget' } ,

	clickTarget( event ){
		// Собираем данные
		var element = event.currentTarget;
		var form 	= element.getAttribute('data-am');		
		
		// Выдвигаем форму
		this.animateForm( form );
		event.preventDefault();
	} ,
	
	animateForm( element ) {
		console.log('Animate form');
		var form 			= document.getElementById( element ) 		;
		var html_body 		= document.getElementById("html_body") 		;
		var color_overlay 	= document.getElementById("color_overlay") 	;
		var main 			= document.getElementById('main_content') 	;

		TweenLite.to(form 			, 1, {left 		:"0"}) ;
		TweenLite.to(color_overlay 	, 1, {opacity 	:"0.8", "-webkit-opacity":"1", 'pointer-events':"auto"});
		TweenLite.to(main_content 	, 1, {filter 	:"blur(5px)", "-webkit-filter":"blur(4px)", transform:"scale(0.95, 0.95)"});
		TweenLite.to(html_body 		, 1, {overflow 	:"hidden"});
	}
});