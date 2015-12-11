window.hostUrl = 'http://176.112.194.149:81'
$(function() {
  $('.username h1').click(function(){
    fx.do(['background', 'editProfile'], bodyClick, bodyClickOff);
  });
  $('#edit_profile_btn').click(function(){
    $('#edit-profile').css('display', 'block');
    fx.do(['background', 'editProfile'], bodyClick, function(){
      $('#edit-profile').css('display', 'none');
      $('body').off('click');
    });
  });

  $('#edit-profile a').click(function(){
    fx.back();
  });
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
    $.ajax({url: hostUrl + '/api/v1/users/' + currentUser.id, data: data, success: function(user) {
      window.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))
      $('section.username h1').text(currentUser.name)
      $('#login_btn').text(currentUser.name)
      if(currentUser.city) {
        $('#city_user span').text(currentUser.city)
      }
      fx.back();
    }, type: 'PUT'});
  })
});
