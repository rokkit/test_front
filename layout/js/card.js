// ui.card = function () {
//   'use strict';
//   var module = {
//     render: function (blazons, color, name, nameCity, el, id) {
//       card(blazons, color, name, nameCity, el, id);
//     }
//   };
//   function card(blazons, color, name, nameCity, el, id) {
//     var img = blazons;
//     var imgUrl = blazons;
//     // console.log(img)
//     blazons = blazons.split('/')[blazons.split('/').length - 1].split('.')[0];
//     var path = '../images/blazons/' + blazons + '.svg';
//     var cardId = blazons + '-card';
//     var card = d3.select(el).append('article').attr('class', 'lounge pointer').attr('data-id', id).attr('id', blazons + '-card');
//     //var gerb = card.append('div');
//     var img = card.append('img').attr('src', img);
//     var cardRect = d3.select('.lounge').node().getBoundingClientRect();
//     var w = cardRect.width;
//     var h = cardRect.height;
//     var svgCard = card.append('svg').attr('width', w).attr('height', h).attr('id', cardId);
//     // svgCard.on('click', event);
//     svgCard.append('rect').attr('x', 10).attr('y', 10).attr('rx', 4).attr('ry', 4).attr('width', w - 20).attr('height', h - 20).style('fill', 'none').style('stroke', color).style('stroke-opacity', 0.4).style('stroke-width', 2);
//     svgCard.append('rect').attr('x', 14).attr('y', 14).attr('rx', 2).attr('ry', 2).attr('width', w - 28).attr('height', h - 28).style('fill', 'none').style('stroke', color).style('stroke-opacity', 0.3).style('stroke-width', 0.8);
//     d3.xml(path, 'image/svg+xml', function (error, xml) {
//       if (error)
//         throw error;
//       var blazonWidth = w - 80;
//       var blazonHeight = h - 80;
//       var blazonX = w / 2 - blazonWidth / 2;
//       var blazonY = 0;
//       d3.select('#' + blazons).attr('x', blazonX).attr('y', blazonY).attr('width', blazonWidth).attr('height', blazonHeight);
//       var title = svgCard.append('text').text('"' + name + '"').attr('font-size', 24).attr('letter-spacing', 4).attr('text-align', 'center').attr('font-family', 'Bebas Neue');
//       var titleWidth = title.node().getBoundingClientRect().width;
//       var titleHeight = title.node().getBoundingClientRect().height;
//       var titleX = w / 2 - titleWidth / 2;
//       var titleY = blazonHeight + blazonY + 1;
//       title.attr('x', titleX);
//       title.attr('y', titleY);
//       if (screen.height < 490) {
//         title.attr('font-size', 74);
//         titleWidth = title.node().getBoundingClientRect().width;
//         titleX = w / 2 - titleWidth / 2;
//         title.attr('x', titleX);
//         title.attr('y', titleY - 120);
//       }
//       if (screen.height > 490 && screen.height < 668) {
//         title.attr('font-size', 74);
//         titleWidth = title.node().getBoundingClientRect().width;
//         titleX = w / 2 - titleWidth / 2;
//         title.attr('x', titleX);
//         title.attr('y', titleY - 120);
//       }
//       var titleCity = svgCard.append('text').text(nameCity).attr('fill', 'rgba(0,0,0,0.5)').attr('font-size', 12).attr('font-family', 'Lora');
//       var titleCityWidth = titleCity.node().getBoundingClientRect().width;
//       var titleCityHeight = titleCity.node().getBoundingClientRect().height;
//       var titleCityX = w / 2 - titleCityWidth / 2;
//       var titleCityY = titleY + titleHeight;
//       titleCity.attr('x', titleCityX);
//       titleCity.attr('y', titleCityY);
//       if (screen.height < 490) {
//         titleCity.attr('font-size', 34);
//         titleCityWidth = titleCity.node().getBoundingClientRect().width;
//         titleCityX = w / 2 - titleCityWidth / 2;
//         titleCity.attr('x', titleCityX);
//         titleCity.attr('y', titleCityY - 90);
//       }
//       if (screen.height > 490 && screen.height < 668) {
//         titleCity.attr('font-size', 34);
//         titleCityWidth = titleCity.node().getBoundingClientRect().width;
//         titleCityX = w / 2 - titleCityWidth / 2;
//         titleCity.attr('x', titleCityX);
//         titleCity.attr('y', titleCityY - 90);
//       }
//     });
//     d3.xml('../images/venzel-corner.svg', 'image/svg+xml', function (error, xml) {
//       if (error)
//         throw error;
//       renderNode(svgCard, xml, 'corner1');
//       renderNode(svgCard, xml, 'corner2');
//       renderNode(svgCard, xml, 'corner3');
//       renderNode(svgCard, xml, 'corner4');
//       var _cardId = '#' + cardId;
//       d3.select(_cardId + ' #corner1').attr('x', 16).attr('y', 16);
//       d3.select(_cardId + ' #corner1 path').attr('fill', color);
//       d3.select(_cardId + ' #corner2').attr('x', w - 32 - 16).attr('y', 16);
//       d3.select(_cardId + ' #corner2 path').attr('fill', color).attr('transform', 'rotate(90 16 16)');
//       d3.select(_cardId + ' #corner3').attr('x', w - 32 - 16).attr('y', h - 32 - 16);
//       d3.select(_cardId + ' #corner3 path').attr('fill', color).attr('transform', 'rotate(180 16 16)');
//       d3.select(_cardId + ' #corner4').attr('x', 16).attr('y', h - 32 - 16);
//       d3.select(_cardId + ' #corner4 path').attr('fill', color).attr('transform', 'rotate(-90 16 16)');
//       if (screen.height < 490) {
//         d3.select(_cardId + ' #corner1').attr('width', 100).attr('height', 100);
//         d3.select(_cardId + ' #corner2').attr('width', 100).attr('height', 100);
//         d3.select(_cardId + ' #corner2').attr('x', w - 32 - 16 - 68).attr('y', 16);
//         d3.select(_cardId + ' #corner3').attr('width', 100).attr('height', 100);
//         d3.select(_cardId + ' #corner3').attr('x', w - 32 - 16 - 68).attr('y', h - 32 - 16 - 68);
//         d3.select(_cardId + ' #corner4').attr('width', 100).attr('height', 100);
//         d3.select(_cardId + ' #corner4').attr('x', 16).attr('y', h - 32 - 16 - 68);
//       }
//       if (screen.height > 490 && screen.height < 668) {
//         d3.select(_cardId + ' #corner1').attr('width', 100).attr('height', 100);
//         d3.select(_cardId + ' #corner2').attr('width', 100).attr('height', 100);
//         d3.select(_cardId + ' #corner2').attr('x', w - 32 - 16 - 68).attr('y', 16);
//         d3.select(_cardId + ' #corner3').attr('width', 100).attr('height', 100);
//         d3.select(_cardId + ' #corner3').attr('x', w - 32 - 16 - 68).attr('y', h - 32 - 16 - 68);
//         d3.select(_cardId + ' #corner4').attr('width', 100).attr('height', 100);
//         d3.select(_cardId + ' #corner4').attr('x', 16).attr('y', h - 32 - 16 - 68);
//       }
//     });
//     return svgCard;
//   }
//   function importNode(xml) {
//     return document.importNode(xml.documentElement, true);
//   }
//   function renderNode(svgNode, xml, id) {
//     var node = importNode(xml);
//     svgNode.node().appendChild(node).setAttribute('id', id);
//   }
//   return module;
// }();
