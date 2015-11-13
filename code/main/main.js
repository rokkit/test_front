import _ from 'underscore';
import 'rivets-backbone-adapter';
import 'backbone';
import 'gsap';

import Rivets from 'rivets';
import Marionette from 'backbone.marionette';

import Collection 	from 'collections/lounges'		 ;
import Template		from 'main/main.hbs'			 ;
import ItemTemplate	from 'main/main_itemview.hbs'	 ;

let data = [{
	title	: 'blazon'				,
	blazon 	: 'public/images/blazons/gerb_spb_blazon.svg' ,
	city	: 'Тюмень'				,
	color 	: '#7DBE6D'
},{
	title	: 'Академия' 			 ,
	blazon 	: 'public/images/blazons/gerb_spb_academy.svg' ,
	city	: 'Санкт-Петербург' 	 ,
	color 	: '#5F4D9B'
},{
	title	: 'Либерти'				 ,
	blazon 	: 'public/images/blazons/gerb_spb_liberty.svg' ,
	city	: 'Санкт-Петербург' 	 ,
	color 	: '#65B6DC'
},{
	title	: 'unity hall' 				 ,
	blazon 	: 'public/images/blazons/gerb_kazan_unityhall.svg' ,
	city	: 'Казань' 					 ,
	color 	: '#E76144'
}];

let childView 	= Marionette.ItemView.extend({
	tagName 	: 'article'		,
	className 	: 'lounge' 		,
	template 	: ItemTemplate	,
	onRender(){
		window.lModel = this.model;
		this.binding = Rivets.bind(this.el, {model: this.model});
	}

});

export default Marionette.CompositeView.extend({
	el 					: 'body'				 ,
	template 			: Template 		 	 	 ,
	childView 			: childView 			 ,
	childViewContainer 	: '#lounges-body'	 	 ,

	initialize() {
		this.collection = new Collection( data );
		window.col = this.collection;
		window.tU = _;
		console.log( this.template );
		//this.collection.fetch();
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