var currentUser = JSON.parse(localStorage.getItem('currentUser'));
$(function () {
  $.getJSON('http://176.112.194.149:81/api/v1/skills.json', {
    auth_token: currentUser.auth_token,
    role: 'hookmaster'
  }, function (json) {
    var data = skillgen(json);
    skillBoard('#skill-view', data, 'hookmaster');
  });
});