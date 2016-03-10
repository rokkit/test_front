var fx = new FX(fxa.dashboard);
var inviteUsers = {};
var currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
  localStorage.removeItem('currentUser');
  document.location.href = '/pages_index.html';
}
_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
function bodyClick(e) {
  $('body').on('click', function (e) {
    fx.back();
  });
}
function bodyClickOff() {
  $('body').off('click');
  $('#wrapper_signup').css('pointer-events', 'none');
}
$(function () {
  $('#code_form .button-small').on('click', function () {
    var code = $('#code_form input[name="code"]').val();
    $.post(hostUrl + '/api/v1/auth/registrations/confirm', {
      code: code,
      phone: currentUser.phone
    }, function (resp) {
      if (resp.status == 'error') {
        $('#code_form input[name="code"]').addClass('wrong');
      } else {
        fx.back();
      }
    });
  });
  //отправить код повторно
  $('#code_form .button-link').on('click', function (e) {
    e.preventDefault();
    var phone = $('#code_form').data('phone');
    $.post(hostUrl + '/api/v1/auth/registrations/resend_code.json', { phone: phone }, function () {
      $('#code_form input[name="code"]').removeClass('wrong');
      $('#code_form .button-link').text('Код отправлен');
    });
  });
});
// $(function(){
//   function rndR(min, max) {
//     var rand = min + Math.random() * (max - min)
//     rand = Math.round(rand);
//     return rand;
//   }
//
//   var layoutWidth = $('#face').width();
//   var layoutHeight = $('#face').height();
//
//   var layout = d3.select('#face').append('svg')
//   .attr('width', layoutWidth)
//   .attr('height', layoutHeight);
//
//   layout.append("defs")
//       .append('pattern')
//       .attr("id", "face-img")
//       .attr('x', 0)
//       .attr('y', 0)
//       .attr('width', 200)
//       .attr('height', 200)
//       .attr('patternUnits', 'userSpaceOnUse')
//       .append("image")
//       .attr('x', 20)
//       .attr('y', 0)
//       .attr('width', 200)
//       .attr('height', 200)
//
//
//   layout.append('circle')
//   .attr('r', 70)
//   .attr('fill', 'transparent')
//   .attr('stroke', '#fff')
//   .attr('opacity', 0.4)
//   .attr('cx', layoutWidth/2)
//   .attr('cy', layoutHeight/2);
//
//   layout.append('circle')
//   .attr('r', 50)
//   .attr('stroke', '#EBB22F')
//   .attr('stroke-width', 2.5)
//   .attr('fill', 'transparent')
//   .attr('cx', layoutWidth/2)
//   .attr('cy', layoutHeight/2);
//
//   layout.append('circle')
//   .attr('r', 44)
//   .attr('fill', 'url(#face-img)')
//   .attr('cx', layoutWidth/2)
//   .attr('cy', layoutHeight/2);
//
//   for (var i = 0; i < 360; i += 12) {
//     var r = rndR(68, 100);
//     layout.append('line')
//     .attr('stroke', '#EBB22F')
//     .attr('opacity', function(){
//       var res = 1;
//       if(r < 85){
//         res = 0.6;
//       }
//       if(r < 80){
//         res = 0.4;
//       }
//       if(r < 76){
//         res = 0.2;
//       }
//       return res;
//     })
//     .attr('stroke-width', '2.4')
//     .attr('x1', function(d){
//       var rad = i * (Math.PI/180);
//       return 100 + 50 * Math.cos(rad);
//     })
//     .attr('y1', function(d){
//       var rad = i * (Math.PI/180);
//       return 100 + 50 * Math.sin(rad);
//     })
//     .attr('x2', function(d){
//       var rad = i * (Math.PI/180);
//       return 100 + r * Math.cos(rad);
//     })
//     .attr('y2', function(d){
//       var rad = i * (Math.PI/180);
//       return 100 + r * Math.sin(rad);
//     });
//   }
//
// });
$(function () {
  $('.popup_vertical_symbol').css('pointer-events', 'none');
  var css = 'text-shadow: -1px -1px hsl(0,100%,50%), 1px 1px hsl(5.4, 100%, 50%), 3px 2px hsl(10.8, 100%, 50%), 5px 3px hsl(16.2, 100%, 50%), 7px 4px hsl(21.6, 100%, 50%), 9px 5px hsl(27, 100%, 50%), 11px 6px hsl(32.4, 100%, 50%), 13px 7px hsl(37.8, 100%, 50%), 14px 8px hsl(43.2, 100%, 50%), 16px 9px hsl(48.6, 100%, 50%), 18px 10px hsl(54, 100%, 50%), 20px 11px hsl(59.4, 100%, 50%), 22px 12px hsl(64.8, 100%, 50%), 23px 13px hsl(70.2, 100%, 50%), 25px 14px hsl(75.6, 100%, 50%), 27px 15px hsl(81, 100%, 50%), 28px 16px hsl(86.4, 100%, 50%), 30px 17px hsl(91.8, 100%, 50%), 32px 18px hsl(97.2, 100%, 50%), 33px 19px hsl(102.6, 100%, 50%), 35px 20px hsl(108, 100%, 50%), 36px 21px hsl(113.4, 100%, 50%), 38px 22px hsl(118.8, 100%, 50%), 39px 23px hsl(124.2, 100%, 50%), 41px 24px hsl(129.6, 100%, 50%), 42px 25px hsl(135, 100%, 50%), 43px 26px hsl(140.4, 100%, 50%), 45px 27px hsl(145.8, 100%, 50%), 46px 28px hsl(151.2, 100%, 50%), 47px 29px hsl(156.6, 100%, 50%), 48px 30px hsl(162, 100%, 50%), 49px 31px hsl(167.4, 100%, 50%), 50px 32px hsl(172.8, 100%, 50%), 51px 33px hsl(178.2, 100%, 50%), 52px 34px hsl(183.6, 100%, 50%), 53px 35px hsl(189, 100%, 50%), 54px 36px hsl(194.4, 100%, 50%), 55px 37px hsl(199.8, 100%, 50%), 55px 38px hsl(205.2, 100%, 50%), 56px 39px hsl(210.6, 100%, 50%), 57px 40px hsl(216, 100%, 50%), 57px 41px hsl(221.4, 100%, 50%), 58px 42px hsl(226.8, 100%, 50%), 58px 43px hsl(232.2, 100%, 50%), 58px 44px hsl(237.6, 100%, 50%), 59px 45px hsl(243, 100%, 50%), 59px 46px hsl(248.4, 100%, 50%), 59px 47px hsl(253.8, 100%, 50%), 59px 48px hsl(259.2, 100%, 50%), 59px 49px hsl(264.6, 100%, 50%), 60px 50px hsl(270, 100%, 50%), 59px 51px hsl(275.4, 100%, 50%), 59px 52px hsl(280.8, 100%, 50%), 59px 53px hsl(286.2, 100%, 50%), 59px 54px hsl(291.6, 100%, 50%), 59px 55px hsl(297, 100%, 50%), 58px 56px hsl(302.4, 100%, 50%), 58px 57px hsl(307.8, 100%, 50%), 58px 58px hsl(313.2, 100%, 50%), 57px 59px hsl(318.6, 100%, 50%), 57px 60px hsl(324, 100%, 50%), 56px 61px hsl(329.4, 100%, 50%), 55px 62px hsl(334.8, 100%, 50%), 55px 63px hsl(340.2, 100%, 50%), 54px 64px hsl(345.6, 100%, 50%), 53px 65px hsl(351, 100%, 50%), 52px 66px hsl(356.4, 100%, 50%), 51px 67px hsl(361.8, 100%, 50%), 50px 68px hsl(367.2, 100%, 50%), 49px 69px hsl(372.6, 100%, 50%), 48px 70px hsl(378, 100%, 50%), 47px 71px hsl(383.4, 100%, 50%), 46px 72px hsl(388.8, 100%, 50%), 45px 73px hsl(394.2, 100%, 50%), 43px 74px hsl(399.6, 100%, 50%), 42px 75px hsl(405, 100%, 50%), 41px 76px hsl(410.4, 100%, 50%), 39px 77px hsl(415.8, 100%, 50%), 38px 78px hsl(421.2, 100%, 50%), 36px 79px hsl(426.6, 100%, 50%), 35px 80px hsl(432, 100%, 50%), 33px 81px hsl(437.4, 100%, 50%), 32px 82px hsl(442.8, 100%, 50%), 30px 83px hsl(448.2, 100%, 50%), 28px 84px hsl(453.6, 100%, 50%), 27px 85px hsl(459, 100%, 50%), 25px 86px hsl(464.4, 100%, 50%), 23px 87px hsl(469.8, 100%, 50%), 22px 88px hsl(475.2, 100%, 50%), 20px 89px hsl(480.6, 100%, 50%), 18px 90px hsl(486, 100%, 50%), 16px 91px hsl(491.4, 100%, 50%), 14px 92px hsl(496.8, 100%, 50%), 13px 93px hsl(502.2, 100%, 50%), 11px 94px hsl(507.6, 100%, 50%), 9px 95px hsl(513, 100%, 50%), 7px 96px hsl(518.4, 100%, 50%), 5px 97px hsl(523.8, 100%, 50%), 3px 98px hsl(529.2, 100%, 50%), 1px 99px hsl(534.6, 100%, 50%), 7px 100px hsl(540, 100%, 50%), -1px 101px hsl(545.4, 100%, 50%), -3px 102px hsl(550.8, 100%, 50%), -5px 103px hsl(556.2, 100%, 50%), -7px 104px hsl(561.6, 100%, 50%), -9px 105px hsl(567, 100%, 50%), -11px 106px hsl(572.4, 100%, 50%), -13px 107px hsl(577.8, 100%, 50%), -14px 108px hsl(583.2, 100%, 50%), -16px 109px hsl(588.6, 100%, 50%), -18px 110px hsl(594, 100%, 50%), -20px 111px hsl(599.4, 100%, 50%), -22px 112px hsl(604.8, 100%, 50%), -23px 113px hsl(610.2, 100%, 50%), -25px 114px hsl(615.6, 100%, 50%), -27px 115px hsl(621, 100%, 50%), -28px 116px hsl(626.4, 100%, 50%), -30px 117px hsl(631.8, 100%, 50%), -32px 118px hsl(637.2, 100%, 50%), -33px 119px hsl(642.6, 100%, 50%), -35px 120px hsl(648, 100%, 50%), -36px 121px hsl(653.4, 100%, 50%), -38px 122px hsl(658.8, 100%, 50%), -39px 123px hsl(664.2, 100%, 50%), -41px 124px hsl(669.6, 100%, 50%), -42px 125px hsl(675, 100%, 50%), -43px 126px hsl(680.4, 100%, 50%), -45px 127px hsl(685.8, 100%, 50%), -46px 128px hsl(691.2, 100%, 50%), -47px 129px hsl(696.6, 100%, 50%), -48px 130px hsl(702, 100%, 50%), -49px 131px hsl(707.4, 100%, 50%), -50px 132px hsl(712.8, 100%, 50%), -51px 133px hsl(718.2, 100%, 50%), -52px 134px hsl(723.6, 100%, 50%), -53px 135px hsl(729, 100%, 50%), -54px 136px hsl(734.4, 100%, 50%), -55px 137px hsl(739.8, 100%, 50%), -55px 138px hsl(745.2, 100%, 50%), -56px 139px hsl(750.6, 100%, 50%), -57px 140px hsl(756, 100%, 50%), -57px 141px hsl(761.4, 100%, 50%), -58px 142px hsl(766.8, 100%, 50%), -58px 143px hsl(772.2, 100%, 50%), -58px 144px hsl(777.6, 100%, 50%), -59px 145px hsl(783, 100%, 50%), -59px 146px hsl(788.4, 100%, 50%), -59px 147px hsl(793.8, 100%, 50%), -59px 148px hsl(799.2, 100%, 50%), -59px 149px hsl(804.6, 100%, 50%), -60px 150px hsl(810, 100%, 50%), -59px 151px hsl(815.4, 100%, 50%), -59px 152px hsl(820.8, 100%, 50%), -59px 153px hsl(826.2, 100%, 50%), -59px 154px hsl(831.6, 100%, 50%), -59px 155px hsl(837, 100%, 50%), -58px 156px hsl(842.4, 100%, 50%), -58px 157px hsl(847.8, 100%, 50%), -58px 158px hsl(853.2, 100%, 50%), -57px 159px hsl(858.6, 100%, 50%), -57px 160px hsl(864, 100%, 50%), -56px 161px hsl(869.4, 100%, 50%), -55px 162px hsl(874.8, 100%, 50%), -55px 163px hsl(880.2, 100%, 50%), -54px 164px hsl(885.6, 100%, 50%), -53px 165px hsl(891, 100%, 50%), -52px 166px hsl(896.4, 100%, 50%), -51px 167px hsl(901.8, 100%, 50%), -50px 168px hsl(907.2, 100%, 50%), -49px 169px hsl(912.6, 100%, 50%), -48px 170px hsl(918, 100%, 50%), -47px 171px hsl(923.4, 100%, 50%), -46px 172px hsl(928.8, 100%, 50%), -45px 173px hsl(934.2, 100%, 50%), -43px 174px hsl(939.6, 100%, 50%), -42px 175px hsl(945, 100%, 50%), -41px 176px hsl(950.4, 100%, 50%), -39px 177px hsl(955.8, 100%, 50%), -38px 178px hsl(961.2, 100%, 50%), -36px 179px hsl(966.6, 100%, 50%), -35px 180px hsl(972, 100%, 50%), -33px 181px hsl(977.4, 100%, 50%), -32px 182px hsl(982.8, 100%, 50%), -30px 183px hsl(988.2, 100%, 50%), -28px 184px hsl(993.6, 100%, 50%), -27px 185px hsl(999, 100%, 50%), -25px 186px hsl(1004.4, 100%, 50%), -23px 187px hsl(1009.8, 100%, 50%), -22px 188px hsl(1015.2, 100%, 50%), -20px 189px hsl(1020.6, 100%, 50%), -18px 190px hsl(1026, 100%, 50%), -16px 191px hsl(1031.4, 100%, 50%), -14px 192px hsl(1036.8, 100%, 50%), -13px 193px hsl(1042.2, 100%, 50%), -11px 194px hsl(1047.6, 100%, 50%), -9px 195px hsl(1053, 100%, 50%), -7px 196px hsl(1058.4, 100%, 50%), -5px 197px hsl(1063.8, 100%, 50%), -3px 198px hsl(1069.2, 100%, 50%), -1px 199px hsl(1074.6, 100%, 50%), -1px 200px hsl(1080, 100%, 50%), 1px 201px hsl(1085.4, 100%, 50%), 3px 202px hsl(1090.8, 100%, 50%), 5px 203px hsl(1096.2, 100%, 50%), 7px 204px hsl(1101.6, 100%, 50%), 9px 205px hsl(1107, 100%, 50%), 11px 206px hsl(1112.4, 100%, 50%), 13px 207px hsl(1117.8, 100%, 50%), 14px 208px hsl(1123.2, 100%, 50%), 16px 209px hsl(1128.6, 100%, 50%), 18px 210px hsl(1134, 100%, 50%), 20px 211px hsl(1139.4, 100%, 50%), 22px 212px hsl(1144.8, 100%, 50%), 23px 213px hsl(1150.2, 100%, 50%), 25px 214px hsl(1155.6, 100%, 50%), 27px 215px hsl(1161, 100%, 50%), 28px 216px hsl(1166.4, 100%, 50%), 30px 217px hsl(1171.8, 100%, 50%), 32px 218px hsl(1177.2, 100%, 50%), 33px 219px hsl(1182.6, 100%, 50%), 35px 220px hsl(1188, 100%, 50%), 36px 221px hsl(1193.4, 100%, 50%), 38px 222px hsl(1198.8, 100%, 50%), 39px 223px hsl(1204.2, 100%, 50%), 41px 224px hsl(1209.6, 100%, 50%), 42px 225px hsl(1215, 100%, 50%), 43px 226px hsl(1220.4, 100%, 50%), 45px 227px hsl(1225.8, 100%, 50%), 46px 228px hsl(1231.2, 100%, 50%), 47px 229px hsl(1236.6, 100%, 50%), 48px 230px hsl(1242, 100%, 50%), 49px 231px hsl(1247.4, 100%, 50%), 50px 232px hsl(1252.8, 100%, 50%), 51px 233px hsl(1258.2, 100%, 50%), 52px 234px hsl(1263.6, 100%, 50%), 53px 235px hsl(1269, 100%, 50%), 54px 236px hsl(1274.4, 100%, 50%), 55px 237px hsl(1279.8, 100%, 50%), 55px 238px hsl(1285.2, 100%, 50%), 56px 239px hsl(1290.6, 100%, 50%), 57px 240px hsl(1296, 100%, 50%), 57px 241px hsl(1301.4, 100%, 50%), 58px 242px hsl(1306.8, 100%, 50%), 58px 243px hsl(1312.2, 100%, 50%), 58px 244px hsl(1317.6, 100%, 50%), 59px 245px hsl(1323, 100%, 50%), 59px 246px hsl(1328.4, 100%, 50%), 59px 247px hsl(1333.8, 100%, 50%), 59px 248px hsl(1339.2, 100%, 50%), 59px 249px hsl(1344.6, 100%, 50%), 60px 250px hsl(1350, 100%, 50%), 59px 251px hsl(1355.4, 100%, 50%), 59px 252px hsl(1360.8, 100%, 50%), 59px 253px hsl(1366.2, 100%, 50%), 59px 254px hsl(1371.6, 100%, 50%), 59px 255px hsl(1377, 100%, 50%), 58px 256px hsl(1382.4, 100%, 50%), 58px 257px hsl(1387.8, 100%, 50%), 58px 258px hsl(1393.2, 100%, 50%), 57px 259px hsl(1398.6, 100%, 50%), 57px 260px hsl(1404, 100%, 50%), 56px 261px hsl(1409.4, 100%, 50%), 55px 262px hsl(1414.8, 100%, 50%), 55px 263px hsl(1420.2, 100%, 50%), 54px 264px hsl(1425.6, 100%, 50%), 53px 265px hsl(1431, 100%, 50%), 52px 266px hsl(1436.4, 100%, 50%), 51px 267px hsl(1441.8, 100%, 50%), 50px 268px hsl(1447.2, 100%, 50%), 49px 269px hsl(1452.6, 100%, 50%), 48px 270px hsl(1458, 100%, 50%), 47px 271px hsl(1463.4, 100%, 50%), 46px 272px hsl(1468.8, 100%, 50%), 45px 273px hsl(1474.2, 100%, 50%), 43px 274px hsl(1479.6, 100%, 50%), 42px 275px hsl(1485, 100%, 50%), 41px 276px hsl(1490.4, 100%, 50%), 39px 277px hsl(1495.8, 100%, 50%), 38px 278px hsl(1501.2, 100%, 50%), 36px 279px hsl(1506.6, 100%, 50%), 35px 280px hsl(1512, 100%, 50%), 33px 281px hsl(1517.4, 100%, 50%), 32px 282px hsl(1522.8, 100%, 50%), 30px 283px hsl(1528.2, 100%, 50%), 28px 284px hsl(1533.6, 100%, 50%), 27px 285px hsl(1539, 100%, 50%), 25px 286px hsl(1544.4, 100%, 50%), 23px 287px hsl(1549.8, 100%, 50%), 22px 288px hsl(1555.2, 100%, 50%), 20px 289px hsl(1560.6, 100%, 50%), 18px 290px hsl(1566, 100%, 50%), 16px 291px hsl(1571.4, 100%, 50%), 14px 292px hsl(1576.8, 100%, 50%), 13px 293px hsl(1582.2, 100%, 50%), 11px 294px hsl(1587.6, 100%, 50%), 9px 295px hsl(1593, 100%, 50%), 7px 296px hsl(1598.4, 100%, 50%), 5px 297px hsl(1603.8, 100%, 50%), 3px 298px hsl(1609.2, 100%, 50%), 1px 299px hsl(1614.6, 100%, 50%), 2px 300px hsl(1620, 100%, 50%), -1px 301px hsl(1625.4, 100%, 50%), -3px 302px hsl(1630.8, 100%, 50%), -5px 303px hsl(1636.2, 100%, 50%), -7px 304px hsl(1641.6, 100%, 50%), -9px 305px hsl(1647, 100%, 50%), -11px 306px hsl(1652.4, 100%, 50%), -13px 307px hsl(1657.8, 100%, 50%), -14px 308px hsl(1663.2, 100%, 50%), -16px 309px hsl(1668.6, 100%, 50%), -18px 310px hsl(1674, 100%, 50%), -20px 311px hsl(1679.4, 100%, 50%), -22px 312px hsl(1684.8, 100%, 50%), -23px 313px hsl(1690.2, 100%, 50%), -25px 314px hsl(1695.6, 100%, 50%), -27px 315px hsl(1701, 100%, 50%), -28px 316px hsl(1706.4, 100%, 50%), -30px 317px hsl(1711.8, 100%, 50%), -32px 318px hsl(1717.2, 100%, 50%), -33px 319px hsl(1722.6, 100%, 50%), -35px 320px hsl(1728, 100%, 50%), -36px 321px hsl(1733.4, 100%, 50%), -38px 322px hsl(1738.8, 100%, 50%), -39px 323px hsl(1744.2, 100%, 50%), -41px 324px hsl(1749.6, 100%, 50%), -42px 325px hsl(1755, 100%, 50%), -43px 326px hsl(1760.4, 100%, 50%), -45px 327px hsl(1765.8, 100%, 50%), -46px 328px hsl(1771.2, 100%, 50%), -47px 329px hsl(1776.6, 100%, 50%), -48px 330px hsl(1782, 100%, 50%), -49px 331px hsl(1787.4, 100%, 50%), -50px 332px hsl(1792.8, 100%, 50%), -51px 333px hsl(1798.2, 100%, 50%), -52px 334px hsl(1803.6, 100%, 50%), -53px 335px hsl(1809, 100%, 50%), -54px 336px hsl(1814.4, 100%, 50%), -55px 337px hsl(1819.8, 100%, 50%), -55px 338px hsl(1825.2, 100%, 50%), -56px 339px hsl(1830.6, 100%, 50%), -57px 340px hsl(1836, 100%, 50%), -57px 341px hsl(1841.4, 100%, 50%), -58px 342px hsl(1846.8, 100%, 50%), -58px 343px hsl(1852.2, 100%, 50%), -58px 344px hsl(1857.6, 100%, 50%), -59px 345px hsl(1863, 100%, 50%), -59px 346px hsl(1868.4, 100%, 50%), -59px 347px hsl(1873.8, 100%, 50%), -59px 348px hsl(1879.2, 100%, 50%), -59px 349px hsl(1884.6, 100%, 50%), -60px 350px hsl(1890, 100%, 50%), -59px 351px hsl(1895.4, 100%, 50%), -59px 352px hsl(1900.8, 100%, 50%), -59px 353px hsl(1906.2, 100%, 50%), -59px 354px hsl(1911.6, 100%, 50%), -59px 355px hsl(1917, 100%, 50%), -58px 356px hsl(1922.4, 100%, 50%), -58px 357px hsl(1927.8, 100%, 50%), -58px 358px hsl(1933.2, 100%, 50%), -57px 359px hsl(1938.6, 100%, 50%), -57px 360px hsl(1944, 100%, 50%), -56px 361px hsl(1949.4, 100%, 50%), -55px 362px hsl(1954.8, 100%, 50%), -55px 363px hsl(1960.2, 100%, 50%), -54px 364px hsl(1965.6, 100%, 50%), -53px 365px hsl(1971, 100%, 50%), -52px 366px hsl(1976.4, 100%, 50%), -51px 367px hsl(1981.8, 100%, 50%), -50px 368px hsl(1987.2, 100%, 50%), -49px 369px hsl(1992.6, 100%, 50%), -48px 370px hsl(1998, 100%, 50%), -47px 371px hsl(2003.4, 100%, 50%), -46px 372px hsl(2008.8, 100%, 50%), -45px 373px hsl(2014.2, 100%, 50%), -43px 374px hsl(2019.6, 100%, 50%), -42px 375px hsl(2025, 100%, 50%), -41px 376px hsl(2030.4, 100%, 50%), -39px 377px hsl(2035.8, 100%, 50%), -38px 378px hsl(2041.2, 100%, 50%), -36px 379px hsl(2046.6, 100%, 50%), -35px 380px hsl(2052, 100%, 50%), -33px 381px hsl(2057.4, 100%, 50%), -32px 382px hsl(2062.8, 100%, 50%), -30px 383px hsl(2068.2, 100%, 50%), -28px 384px hsl(2073.6, 100%, 50%), -27px 385px hsl(2079, 100%, 50%), -25px 386px hsl(2084.4, 100%, 50%), -23px 387px hsl(2089.8, 100%, 50%), -22px 388px hsl(2095.2, 100%, 50%), -20px 389px hsl(2100.6, 100%, 50%), -18px 390px hsl(2106, 100%, 50%), -16px 391px hsl(2111.4, 100%, 50%), -14px 392px hsl(2116.8, 100%, 50%), -13px 393px hsl(2122.2, 100%, 50%), -11px 394px hsl(2127.6, 100%, 50%), -9px 395px hsl(2133, 100%, 50%), -7px 396px hsl(2138.4, 100%, 50%), -5px 397px hsl(2143.8, 100%, 50%), -3px 398px hsl(2149.2, 100%, 50%), -1px 399px hsl(2154.6, 100%, 50%); font-size: 40px;';
  var css1 = 'text-shadow: 0 0 10px #000, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de; font-size: 20px';
  new svgIcon(document.querySelector('#menu_header_btn'), svgIconConfig, {
    easing: mina.easein,
    evtoggle: 'mouseover',
    size: {
      w: 34,
      h: 34
    }
  });
  $('#menu_header_logo').click(function () {
    document.location.href = '/pages_index.html';
  });
  // console.log("%c Created by CPDBBK", css);
  console.log('%c Created by CPDBBK', css1);
  window.hostUrl = 'http://176.112.194.149:81';
  $('section.username h1').text(currentUser.name);
  // $('#login_btn').text(currentUser.name);
  if (currentUser.city) {
    $('#city_user span').text(currentUser.city);
  }
  //Загрузить начальные данные
  $(function () {
    $.getJSON(hostUrl + '/api/v1/users/' + currentUser.id + '/load_client_data.json', { auth_token: currentUser.auth_token }, function (json) {
      if (json.meets.length > 0) {
        var last = json.meets.length - 1;
        json.meets.forEach(function (meet, i) {
          if (meet.status === 'wait' && last === i) {
            var date = moment(meet.visit_date).format('LL');
            var timeStart = 'c ' + moment(meet.visit_date).format('H:mm');
            var timeEnd = ' до ' + moment(meet.end_visit_date).format('H:mm');
            var curLounge = meet.lounge.title;
            var u = meet.owner.name + '(организатор)';
            meet.users.forEach(function (user) {
              u = u + ', ' + user.name;
            });
            var html = date + ' ' + timeStart + timeEnd + ' в ' + curLounge + ' <br> ' + u;
            $('#invate_me p').html(html);
            $('#invate_me p').css('font-family', 'Open Sans Regular');
            $('#invate_me p').css('font-size', '14px');
            $('#invate_me button').data('value', meet.id);
            fx.do([
              'invate_me',
              'background'
            ]);
          }
        });
      }
      if (json.payments.length > 0) {
        $('#visit-list .nodata').hide();
        $('#visit-list table').show();
        $('#visit_table_body').empty();
        _.each(json.payments, function (payment) {
          var visit_date = moment(payment.visit_date).format('DD.MM.YYYY HH:mm');
          var visit_date = moment(payment.created_at).format('DD.MM.YYYY HH:mm');
          var el = '<tr data-id=' + payment.id + '><td><h6 style="color:' + payment.color + ';" >' + payment.lounge + '            </h6></td><td class="td-date">' + visit_date + '</td><td>' + payment.amount + '</td></tr>';
          $('#visit_table_body').append(el);
        });
      } else {
        $('#visit-list table').hide();
        $('#visit-list .nodata').show();
      }
      var users_for_invite = _.sortBy(json.users, function (u) {
        u.name;
      });
      users_for_invite.forEach(function (user) {
        $('#invite_users').append('<option value=' + user.id + '>' + user.name + '</option>');
      });
      $('#invite_users').chosen({placeholder_text_single: "Добавьте нового участника..."});
      $(".chosen-single span").html("Добавьте нового участника...");
      var invitedUserTpl = _.template($('#invited_user_tpl').html());
      var maxInviteCount = 6;
      $(".chosen-single span").html("Добавьте нового участника...");

      $(".chosen-results li").click(function(e) {
		$(".chosen-single span").html("Добавьте нового участника...");
	  });

      $('#invite_users').change(function (e) {
		$(".chosen-single span").html("Добавьте нового участника...");
        if (_.keys(inviteUsers).length >= maxInviteCount) {
          return false;
        } else {
          var el = $('#invite_users option:selected');
          var id = el.attr('value');
          if (!inviteUsers[id]) {
            $('#invited_users_container').append(invitedUserTpl({
              id: id,
              name: el.text()
            }));
            $('.cross_delete').click(function () {
              var id = $(this).parent('.invited_user').data('id');
              delete inviteUsers[id];
              $(this).parent('.invited_user').remove();
              if (_.keys(inviteUsers).length === 0) {
                $('#client_count_input').attr('disabled', false);
                $('#client_count_input option:first').attr('hidden', true).attr('selected', false);
              }
            });
            inviteUsers[id] = true;
            $('#client_count_input').attr('disabled', true);
            $('#client_count_input option:first').attr('hidden', false).attr('selected', true);
          }
        }
      });
      $('#invate_me button[name="cancel"]').on('click', function (e) {
        var id = $(e.currentTarget).data('value');
        $.post(hostUrl + '/api/v1/meets/' + id + '/decline', { auth_token: currentUser.auth_token }, function () {
          getReservations();
          fx.back();
        });
      });
      $('#invate_me button[name="ok"]').on('click', function (e) {
        var id = $(e.currentTarget).data('value');
        $.post(hostUrl + '/api/v1/meets/' + id + '/accept', { auth_token: currentUser.auth_token }, function () {
          getReservations();
          fx.back();
        });
      });
      $('#reserv_form').submit(function (e) {
        e.preventDefault();
        TweenLite.to('section.error_tooltip', 1, { opacity: 0 });
        $('.wrong').removeClass('wrong');
        if ($('#reserv_form select[name=visit_time]').val() == 'время') {
          TweenLite.to('section.error_tooltip', 1, { opacity: 1 });
          $('#reserv_form select[name="visit_time"]').addClass('wrong');
          return;
        }
        var visit_date = $('#visit_date').val();
        if (visit_date == 'today') {
          visit_date = moment().format('DD.MM.YYYY');
        } else if (visit_date == 'tomorrow') {
          visit_date = moment().add(1, 'days').format('DD.MM.YYYY');
        }
        var visit_time = $('#reserv_form select[name=visit_time]').val();
        $.post(hostUrl + '/api/v1/reservations.json', {
          auth_token: currentUser.auth_token,
          lounge: $('#reserv_form select[name=lounge]').val(),
          table_id: $('#reserv_form select[name=table]').val(),
          client_count: $('#reserv_form select[name=client_count]').val(),
          duration: $('#reserv_form select[name=duration]').val(),
          visit_date: visit_date + ' ' + $('#reserv_form select[name=visit_time]').val(),
          meets: _.keys(inviteUsers)
        }, function (json) {
          handleReservationResponse(json, function () {
            fx.swap('reserv', 'reserv_succes_form');
          });
        });
      });
      _.each(json.lounges, function (lounge) {
        //console.log(lounge)
        $('select[name="lounge"]').append('<option value=' + lounge.id + '>' + lounge.title + '</option>');
        $('select[name="table"]').append('<optgroup data-id=' + lounge.id + ' label=\'' + lounge.title + '\'>');
        _.each(lounge.tables, function (table) {
          $('optgroup[data-id=' + lounge.id + ']').append('<option value=' + table.id + '>' + table.title + '</option>');
        });
        $('select[name="table"]').append('</optgroup>');
      });
      $('#reserv_form select[name="lounge"] option:last').attr('selected', 'selected');
    });
    $.getJSON(hostUrl + '/api/v1/users/rating.json', {
      role: currentUser.role,
      auth_token: currentUser.auth_token
    }, function (json) {
      makeUserRating(json.users_month, json.users_all_time);
    });
    getReservations();
    $.getJSON(hostUrl + '/api/v1/users/' + currentUser.id + '.json', { auth_token: currentUser.auth_token }, function (json) {
      var exp = parseInt(json.exp, 10);
      var need_to_levelup = parseInt(json.need_to_levelup, 10);
      $('#need_points').text(need_to_levelup);
      $('#next_level').text(json.level + 1);
      $('#user_level').text(json.level);
      fillSkillPointsInfo(json.skill_point);
      if (json.country !== '' && json.city !== '') {
        $('#city_user').append('<span>').text(json.city + ', ' + json.country);
      } else {
        var a = $('<a>');
        a.text('Укажите в редактирование профиля город и страну');
        a.css('opacity', 0.4);
        a.on('click', function () {
          $('#edit-profile').css('display', 'block');
          fx.do([
            'background',
            'editProfile'
          ], bodyClick, function () {
            $('#edit-profile').css('display', 'none');
            $('body').off('click');
          });
        });
        $('#city_user').append('<span>').append(a);
      }
      $('.progress').css('width', json.percents_exp + '%');
      window.currentUser = json;
      localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
      if (currentUser.role == 'hookmaster' && document.location.href.split('/')[3] == 'dashboard_client.html') {
        document.location.href = '/dashboard_hmaster.html';
      }
      setTimeout(function () {
        if (!currentUser.confirmed_at) {
          $('#code_form').data('phone', currentUser.phone);
          fx.do([
            'code_form',
            'background'
          ]);
        }
      }, 300);
    });
  });
  function makeUserRating(users_month, users_all_time) {
    console.log(users_month, users_all_time);

    /** Sort according to experience... */
    users_month.sort(function (a, b) { return a.exp - b.exp; });

    $('#section-per-month .leaders').empty();
    var user_rating_tpl = _.template($('#user_rating_tpl').html());
    $.each(users_month.reverse(), function (i) {
      if (i < 10) {
        $('#section-per-month #rating_top').append(user_rating_tpl({
          name: this.name,
          number: i + 1,
          exp: parseInt(this.exp, 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        }));
      }
      // if (i == users_month.length - 1) {
      //   $('#section-per-month #rating_top').append('<div class="border-bottom-dashed"></div>');
      //   $('#section-per-month #rating_top').append(user_rating_tpl({
      //     name: this.name,
      //     number: i + 1,
      //     exp: parseInt(this.exp, 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      //   }));
      // }
    });
    $('#section-per-all-time .leaders').empty();
    $.each(users_all_time, function (i) {
      if (i < 10) {
        $('#section-per-all-time .leaders').append(user_rating_tpl({
          name: this.name,
          number: i + 1,
          exp: parseInt(this.exp, 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        }));
      }
    });
  }
  function bodyClickOff() {
    $('#edit-profile').hide();
    $('body').off('click');
    $('#reserv_succes_form').css('right', '1600');
    $('#invate_me').css('right', '1600');
  }
  $('#n_o_a').click(function (e) {
    TweenLite.to('section.error_tooltip', 0, { opacity: 0 });
    fx.do([
      'reserv',
      'background'
    ], bodyClick, bodyClickOff);
  });
  $('#inviteto').click(function (e) {
    TweenLite.to('section.error_tooltip', 0, { opacity: 0 });
    fx.do([
      'invite',
      'background'
    ], bodyClick, bodyClickOff);
  });
  var currentTime = new Date();
  var times = $('select[name="visit_time"]').html();
  var time_options = $(times).filter(function (index) {
    return !$(this).data('time') || $(this).data('time') && $(this).data('time') > (currentTime.getHours() + 1).toString() + currentTime.getMinutes().toString();
  });
  $('select[name="visit_time"]').html(time_options);
  $('select[name="visit_date"]').on('change', function () {
    var visit_date = $(this).val();
    if (visit_date == 'today') {
      var time_options = $(times).filter(function (index) {
        return !$(this).data('time') || $(this).data('time') && $(this).data('time') > (currentTime.getHours() + 1).toString() + currentTime.getMinutes().toString();
      });
      $('select[name="visit_time"]').html(time_options);
    } else if (visit_date == 'tomorrow') {
      $('select[name="visit_time"]').html(times);
    } else if (visit_date == 'date_choose') {
      $(this).replaceWith('<input type=text name="visit_date" id="visit_date" placeholder="ДД.ММ.ГГГГ"/>');
      var picker = new Pikaday({
        field: document.getElementById('visit_date'),
        format: 'DD.MM.YYYY',
        firstDay: 1,
        minDate: new Date(),
        maxDate: moment().add(2, 'months').toDate(),
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
      picker.show();
      $('select[name="visit_time"]').html(times);
    }
  });
  $(document).on('change', 'input#visit_date', function () {
    var selectedDate = moment($(this).val(), 'DD.MM.YYYY');
    var today = moment();
    //если сегодня
    if (today.startOf('day').isSame(selectedDate.startOf('day'))) {
      var time_options = $(times).filter(function (index) {
        return !$(this).data('time') || $(this).data('time') && $(this).data('time') > (currentTime.getHours() + 1).toString() + currentTime.getMinutes().toString();
      });
      $('select[name="visit_time"]').html(time_options);
    } else {
      $('select[name="visit_time"]').html(times);
    }
  });
  $('#reserv_succes_form').submit(function (e) {
    fx.back();
    e.preventDefault();
  });
  $('#invate_succes_form').submit(function (e) {
    fx.back();
    e.preventDefault();
  });
  $('#logout_btn').click(function () {
    localStorage.removeItem('currentUser');
    window.currentUser = null;
    document.location.href = '/pages_index.html';
  });
  $('#reserv_succes_form').click(function (event) {
    event.stopPropagation();
  });
  $('#login_header_btn').on('click', function () {
    document.location.href = '/dashboard_client.html';
    window.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  });
});
// PRELOADER
$(function () {
  var html_body = document.getElementById('main_content');
  TweenLite.to(html_body, 1, { opacity: 1 });
});
function bodyClick(e) {
  $('body').on('click', function (e) {
    TweenLite.to('section.error_tooltip', 1, { opacity: 0 });
    fx.back();
  });
}
//Изменение статуса бронирования
$(function () {
  $(document).on('click', '.cancel_reserv_confirm', function (e) {
    var $popover = $(this).closest('tr').find('.popover-reserv');
    $(this).closest('tr').remove();
    if ($('#reserve_table_body tr').length === 0) {
      $('#reserv-list .nodata').show();
      $('#reserv-list table').hide();
    }
    $.ajax({
      url: hostUrl + '/api/v1/reservations/' + $(this).closest('tr').data('id'),
      data: { auth_token: currentUser.auth_token },
      type: 'DELETE'
    });
  });
  $(document).on('click', '.cancel_reserv_decline', function (e) {
    var $popover = $(this).closest('tr').find('.popover-reserv');
    $popover.hide();
  });
  $(document).on('click', '.cancel_reserv', function (e) {
    console.log('Click cancel_reserv');
    var _this = this;
    var $popover = $(this).closest('tr').find('.popover-reserv');
    $popover.toggleClass('popover-reserv-open popover-reserv-close');
  });
});
function getReservations() {
  moment.locale('ru');
  $.getJSON(hostUrl + '/api/v1/reservations.json', { auth_token: currentUser.auth_token }, function (json) {
    if (json.length > 0) {
      $('#reserv-list .nodata').hide();
      $('#reserv-list table').show();
      $('#reserve_table_body').empty();
      var reserv_tpl = _.template($('#reservation_tpl').html());
      _.each(json, function (reserv) {
        var visit_date_obj = moment(reserv.visit_date);
        var visit_date = visit_date_obj.format('DD.MM.YYYY');
        var visit_time = visit_date_obj.format('HH:mm');
        var end_visit_time = moment(reserv.end_visit_date).format('HH:mm');
        var statuses = {
          'wait': 'Отменить',
          'approve': 'Подтверждено'
        };
        var status = statuses[reserv.status];
        var reserv_el = reserv_tpl({
          id: reserv.id,
          color: reserv.lounge.color,
          name: reserv.lounge.title,
          visit_date: visit_date,
          visit_time: visit_time,
          end_visit_time: end_visit_time,
          client_count: reserv.client_count,
          status: status
        });
        $('#reserve_table_body').append(reserv_el);
      });
    } else {
      $('#reserv-list table').hide();
      $('#reserv-list .nodata').show();
    }
  });
  $(document).on('click', 'body', function (e) {
    var $popover = $('.popover-reserv');
    var $popover_link = $('.cancel_reserv');
    if ($(e.target).closest($popover).length || $(e.target).closest($popover_link).length && $popover.hasClass('popover-reserv-open')) {
      return;
    } else {
      if ($popover.hasClass('popover-reserv-open')) {
        $popover.removeClass('popover-reserv-open');
        $popover.addClass('popover-reserv-close');
      }
    }
  });
}
function handleReservationResponse(json, callback) {
  if (json.errors) {
    if (json.errors.visit_date) {
      if (json.errors.visit_date == 'reserved') {
        $('.error_tooltip').text('К сожалению, все столики на указанное время забронированы');
        TweenLite.to('section.error_tooltip', 1, { opacity: 1 });
        $('#reserv_form input[name="lounge"]').addClass('wrong');
      } else if (json.errors.visit_date == 'wrong_date_one_client') {
        $('.error_tooltip').text('Вы уже забронировали столик на указанное время');
        TweenLite.to('section.error_tooltip', 1, { opacity: 1 });
        $('#reserv_form input[name="lounge"]').addClass('wrong');
      } else if (json.errors.visit_date == 'wrong_date') {
        $('.error_tooltip').text('Вы не указали дату и время посещения');
        TweenLite.to('section.error_tooltip', 1, { opacity: 1 });
      }
    }
    if (json.errors.table) {
      $('.error_tooltip').text('К сожалению, все столики на указанное время забронированы');
      TweenLite.to('section.error_tooltip', 1, { opacity: 1 });
      $('#reserv_form input[name="lounge"]').addClass('wrong');
    }
    if (json.errors.user) {
      $('.error_tooltip').text('Бронирование в Уникальных Кальянных возможно только с 18 лет');
      TweenLite.to('section.error_tooltip', 1, { opacity: 1 });
    }
  } else {
    var visit_date = moment(json.visit_date).format('DD.MM.YYYY');
    var visit_time = moment(json.visit_date).format('HH:mm');
    $('#visit_date_result').text(visit_date);
    $('#visit_time_result').text(visit_time);
    getReservations();
    inviteUsers = {};
    TweenLite.to('section.error_tooltip', 1, { opacity: 0 });
    callback();
  }
}
function fillSkillPointsInfo(skill_point) {
  if (skill_point === 0) {
    $('#all_talents h5').text('У вас нет очков навыков');
    $('.number_of_skillpoints').text('У вас нет очков навыков');
  } else {
    $('#all_talents h5').text('Осталось очков навыков: ' + skill_point);
    $('.number_of_skillpoints').text('Осталось очков навыков: ' + skill_point);
  }
}
