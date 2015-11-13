import Marionette from 'backbone.marionette';
import 'gsap';

import template from './template.hbs';
import LoungesCollectionView from './main_collectionview';

export default Marionette.LayoutView.extend({
	template 	: template,
	className 	: 'page' ,
	regions 	: {regionLounges : '#region-lounges'},

	initialize() {
		return this.on('render' , this.afterRender , this);
	},

	afterRender() {
		this.regionLounges.show(new LoungesCollectionView());
		return this.initCardsAnimation();
	},

	initCardsAnimation() {
		CSSPlugin.defaultTransformPerspective = 600;

		var elements 	= this.el.querySelectorAll('.lounge');
		return Array.prototype.forEach.call(elements , function( el , i ) {

			return el.addEventListener('click' , function() {

				var backCard	= el.querySelector('.backside');
				var frontCard 	= el.querySelector('.frontside');
				TweenMax.set(backCard , {rotationY : -180});

				var tl = new TimelineMax({ paused : true , onComplete() { return app.appRouter.navigate('about' , {trigger : true}); } });
				tl.set( el , {zIndex : 200} );
				el.animation = tl;

				return el.animation.play();
			});
		});
	}

});
