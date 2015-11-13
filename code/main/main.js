import Marionette from 'backbone.marionette';
import 'gsap';
import Haml from 'haml';

import Collection 	from 'collections/lounges';
import Template		from 'main/main.haml'			 ;
import ItemTemplate	from 'main/main_itemview.haml'	 ;

window.hh = Haml;
window.tt = Template;

let data = [{
	title	: 'blazon'				,
	blazon 	: 'gerb_spb_blazon.svg' ,
	city	: 'Тюмень'				,
	color 	: '#7DBE6D'
},{
	title	: 'Академия' 			 ,
	blazon 	: 'gerb_spb_academy.svg' ,
	city	: 'Санкт-Петербург' 	 ,
	color 	: '#5F4D9B'
},{
	title	: 'Либерти'				 ,
	blazon 	: 'gerb_spb_liberty.svg' ,
	city	: 'Санкт-Петербург' 	 ,
	color 	: '#65B6DC'
},{
	title	: 'unity hall' 				 ,
	blazon 	: 'gerb_kazan_unityhall.svg' ,
	city	: 'Казань' 					 ,
	color 	: '#E76144'
}];

let childView 	= Marionette.ItemView.extend({
	template 	:  Haml( ItemTemplate ) ,
	tagName 	: 'article' 			,
	className 	: 'lounge'
});

export default Marionette.CompositeView.extend({
	el 					: 'body'				 ,
	template 			:  Haml( Template )  	 ,
	childView 			: childView 			 ,
	collection 			: new Collection( data ) ,
	childViewContainer 	: '#lounges-body'	 	 ,

	initialize() {		
		return this.on( 'render' , this.afterRender , this );
	}  ,
	
	afterRender() {
		return this.initCardsAnimation();
	} ,

	initCardsAnimation() {
		CSSPlugin.defaultTransformPerspective = 600;

		var elements 	= this.el.querySelectorAll('.lounge');		
		return Array.prototype.forEach.call( elements , function( el , i ) {
			return el.addEventListener('click' , function() {
				var backCard	= el.querySelector( '.backside'  );
				var frontCard 	= el.querySelector( '.frontside' );
				var tl 			= new TimelineMax( { paused : true , onComplete() { return app.appRouter.navigate('about' , { trigger : true }); } });
				
				TweenMax.set( backCard , { rotationY : -180 } 	 );
				tl.set( el , { zIndex : 200 } );
				el.animation = tl;

				return el.animation.play();
			});

		});
	}

});