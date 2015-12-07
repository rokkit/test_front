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
    console.log('update')
  })
});
