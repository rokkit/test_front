if (window.location.pathname !== "/dashboard_client.html") {
	var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	if (currentUser) {

		$(".logged_in").show();

		/** Bind logout... */
		$('#logout_btn').click(function () {
			localStorage.removeItem('currentUser');
			window.currentUser = null;
			document.location.href = '/pages_index.html';
		});
	} else {
		$(".logged_out").show();
	}
} else {
	var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	if (currentUser) {
		if (currentUser.freezed) {
			$("#n_o_a").remove();
		}
	}
}

//Ссылка в меню
$(function () {
	$('#go_login_from_menu_btn').on('click', function () {
		document.location.href = 'http://176.112.194.149:81/admin';
	});
});
