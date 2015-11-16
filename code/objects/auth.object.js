/**
 * Using in your view:
 * import ObjectAuth "objects/auth.object"
 * -----
 * initialize()		{ this.ObjectAuth = new ObjectAuth(); 	}
 * doSign ( event ) { this.ObjectAuth.doSign( event  );		} ,
 * doLogin( event ) { this.ObjectAuth.doLogin( event ); 	}
 */

'use strict';

import Marionette from 'backbone.marionette';
import $ from 'jquery';

import 'jquery-mask-plugin';

export default Marionette.Object.extend({
	hostUrl				: 'http://192.168.1.39:82' 	,

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
		var phone = $('input[name="phone"]').val();
		var password = $('input[name="password"]').val();		

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