if (window.location.pathname !== "/dashboard_client.html") {
	var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	if (currentUser) {

		/** Don't ask why. */
		/*
		$("nav a").first().remove();
		$("nav a").css("visibility", "hidden");
		$("#header nav").append('<a href="/dashboard_client.html">Мой профиль</a><a id="logout_btn">Выйти</a>');
		*/
		$(".logged_out").hide();
		$(".logged_in").show();

		/** Bind logout... */
		$('#logout_btn').click(function () {
			localStorage.removeItem('currentUser');
			window.currentUser = null;
			document.location.href = '/pages_index.html';
		});
	}
}
