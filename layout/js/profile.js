window.hostUrl = 'http://176.112.194.149:81'
// window.hostUrlLocal = 'http://localhost:3000'
$(function() {
  var $profile_wrapper = $('#edit-profile-wrapper')
  $profile_wrapper.find('input[name="name"]').val(currentUser.name)
  $profile_wrapper.find('input[name="city"]').val(currentUser.city)
  $profile_wrapper.find('input[name="employe"]').val(currentUser.employe)
  $profile_wrapper.find('input[name="work_company"]').val(currentUser.work_company)
  $profile_wrapper.find('input[name="hobby"]').val(currentUser.hobby)
  $profile_wrapper.find('input[name="phone"]').val('+'+currentUser.phone)
  $profile_wrapper.find('input[name="email"]').val(currentUser.email)

  $('form.edit_profile_form').on('submit', function(e) {
    e.preventDefault()

    var data = $(this).serialize() + '&auth_token='+currentUser.auth_token
    console.log('update', data)
    $.ajax({url: hostUrl + '/api/v1/users/' + currentUser.id, data: data, success: function(user) {
      window.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))
    }, type: 'PUT'});
  })
});
