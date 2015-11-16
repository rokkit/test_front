'use strict';

import $ from 'jquery';
import _ from 'lodash';
import 'rivets-backbone-adapter';
import 'jquery-mask-plugin';
import 'backbone';
import 'gsap';

import Rivets from 'rivets';
import Marionette from 'backbone.marionette';

import Collection 	from 'collections/lounges'		;
import Template		from 'main/main.hbs'			;
import ItemTemplate	from 'main/main_itemview.hbs'	;

import AmBehavior from 'behaviors/am/am';

let offline_data = [{"id":4,"title":"Unity Hall","city_id":4,"color":"#da6f50","blazon":"public/images/blazons/gerb_kazan_unityhall.svg"},{"id":6,"title":"Облака","city_id":3,"color":"#64B6DC","blazon":"public/images/blazons/gerb_spb_liberty.svg"},{"id":5,"title":"Резерв","city_id":2,"color":"#7AC36C","blazon":"public/images/blazons/gerb_spb_blazon.svg"},{"id":1,"title":"Академия","city_id":5,"color":"#7946D6","blazon":"public/images/blazons/gerb_spb_academy.svg"},{"id":2,"title":"Либерти","city_id":1,"color":"#6CB9DD","blazon":"public/images/blazons/gerb_spb_liberty.svg"}]

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
	el 					: 'body'				 	,
	template 			: Template 		 	 	 	,
	childView 			: childView 			 	,
	childViewContainer 	: '#lounges-body'	 	 	,
	hostUrl				: 'http://192.168.1.39:82' 	,

	behaviors : { am : { behaviorClass : AmBehavior } } ,
	ui 		: { 
		'formLogin'		: '#login_form' 				,
		'formSign' 		: '#signin_form' 				,
		'inputPhone'	: 'input[name="phone"]'			,
		'inputPassword'	: 'input[name="password"]'
	} ,

	events 	: { 'submit @ui.formLogin' 	: 'doLogin' 	, 'submit @ui.formSign' : 'doSign' } ,

	initialize() {
		this.collection = new Collection();
		window.col 		= this.collection;
		console.log('Init main js' , AmBehavior );
		this.collection.fetch();
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
	} ,

	successAuth(resp) {
		window.currentUser = resp
		document.location.href = '/dashboard.html'
	} ,

	doSign( e ){
		e.preventDefault()
		var phone 		= $('#signin_form input[name="phone"]').val().replace('+', '')
		var password 	= $('#signin_form input[name="password"]').val()
		var name 		= $('#signin_form input[name="name"]').val()
		$.post(this.hostUrl + '/api/v1/auth/registrations.json', {
			phone 	: phone,
			name 	: name,
			password 	: password
		}, function(resp) {
			if(!resp['errors']) {
				doLogin(phone, password)
			} else {
				$('#signin_form input').removeClass('wrong')
				if(resp['errors']['name']) {
					$('#signin_form input[name="name"]').addClass('wrong')
				}
				if(resp['errors']['phone']) {
					$('#signin_form input[name="phone"]').addClass('wrong')
				}
				if(resp['errors']['password']) {
					$('#signin_form input[name="password"]').addClass('wrong')
				}
			}
		});
	} ,

	doLogin( event ){
		var phone 		= this.ui.inputPhone.val() 		;
		var password 	= this.ui.inputPassword.val()	;

		$.post(this.hostUrl + '/api/v1/auth/sessions.json', {
			phone 	: phone ,
			password: password
		}, function(resp) {
			if(!resp['errors']) {
				console.error('Auth error');
				this.successAuth(resp);
			} else {
				console.info('Success auth');
				$('#login_form input').removeClass('wrong');
				
				if(resp['errors']['phone']) {
					console.error('Phone error');
					$('#login_form input[name="phone"]').addClass('wrong');
				}
				
				if(resp['errors']['password']) {
					console.error('Password error');
					$('#login_form input[name="password"]').addClass('wrong');
				}
			}
		});

		event.preventDefault();
	}

});