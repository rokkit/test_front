window.hostUrl = 'http://176.112.194.149:81';
$(function () {
  $('.username h1').click(function () {
    $('#edit-profile').show();
    fx.do([
      'background',
      'editProfile'
    ], bodyClick, bodyClickOff);
  });
  $('#edit_profile_btn').click(function () {
    $('#edit-profile').css('display', 'block');
    fx.do([
      'background',
      'editProfile'
    ], bodyClick, function () {
      $('#edit-profile').css('display', 'none');
      $('body').off('click');
    });
  });
  $('#edit-profile a').click(function () {
    fx.back();
  });
  var $profile_wrapper = $('#edit-profile-wrapper');
  var birthdate = null;
  if (currentUser.birthdate) {
    birthdate = moment(currentUser.birthdate);
  }
  $profile_wrapper.find('input[name="name"]').val(currentUser.name);
  $profile_wrapper.find('input[name="country"]').val(currentUser.country);
  $profile_wrapper.find('input[name="city"]').val(currentUser.city);
  $profile_wrapper.find('input[name="employe"]').val(currentUser.employe);
  $profile_wrapper.find('input[name="work_company"]').val(currentUser.work_company);
  $profile_wrapper.find('input[name="hobby"]').val(currentUser.hobby);
  $profile_wrapper.find('input[name="phone"]').val('+' + currentUser.phone);
  if (currentUser.birthdate) {
    $profile_wrapper.find('input[name="birthdate"]').val(birthdate.format('DD.MM.YYYY'));
  }
  if (currentUser.freezed) {
    $profile_wrapper.find('input[name="name"]').attr('disabled', 'disabled');
    $profile_wrapper.find('input[name="birthdate"]').attr('disabled', 'disabled');
  }
  var picker = new Pikaday({
    field: $profile_wrapper.find('input[name="birthdate"]')[0],
    format: 'DD.MM.YYYY',
    firstDay: 1,
    minDate: moment().subtract(40, 'years').toDate(),
    maxDate: moment().subtract(18, 'years').toDate(),
    defaultDate: moment().subtract(18, 'years').toDate(),
    i18n: {
      previousMonth: 'Предыдущий Месяц',
      nextMonth: 'Следующий Месяц',
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ],
      weekdays: [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
      ],
      weekdaysShort: [
        'Вск',
        'Пон',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб'
      ]
    }
  });
  $profile_wrapper.find('input[name="phone"]').mask('+7 (000) 000-00-00');
  $('form.edit_profile_form button:last').on('click', function (e) {
    e.preventDefault();
    var formData = new FormData($('form.edit_profile_form')[0]);
    formData.append('auth_token', currentUser.auth_token);
    $.ajax({
      type: 'PUT',
      url: hostUrl + '/api/v1/users/' + currentUser.id,
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function (user) {
        window.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        $('section.username h1').text(currentUser.name);
        $('#login_btn').text(currentUser.name);
        if (currentUser.city) {
          $('#city_user span').text(currentUser.city + ', ' + currentUser.country);
          $('#city_user a').hide();
        } else {
          $('#city_user span').text('');
          $('#city_user a').show();
        }
        fx.back();
      },
      error: function (data) {
        console.log('error');
        console.log(data);
      }
    });
  });
});