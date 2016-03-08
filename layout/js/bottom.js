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
}
