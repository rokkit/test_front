ui.card = (function () {
    'use strict';

    var module = {
        render: function(blazons, color, name, nameCity, el){
        	card(blazons, color, name, nameCity, el);
        }
    }

function card(blazons, color, name, nameCity, el){
    var path = '../images/blazons/' + blazons +'.svg';
    var cardId = blazons + '-card';
    var card = d3.select(el).append('article').attr('class', 'lounge');
    var cardRect = d3.select('.lounge').node().getBoundingClientRect();
  	var w = cardRect.width;
  	var h = cardRect.height;
    var svgCard = card.append('svg').attr('width', w).attr('height', h).attr('id', cardId);

  	svgCard.append('rect')
  	.attr('x', 5)
  	.attr('y', 5)
  	.attr('rx', 4)
  	.attr('ry', 4)
  	.attr('width', w-10)
  	.attr('height', h-10)
  	.style('fill', 'none')
  	.style('stroke', color)
  	.style('stroke-width', 2);

  	svgCard.append('rect')
  	.attr('x', 9)
  	.attr('y', 9)
  	.attr('rx', 2)
  	.attr('ry', 2)
  	.attr('width', w-18)
  	.attr('height', h-18)
  	.style('fill', 'none')
  	.style('stroke', color)
  	.style('stroke-width', 1);

  	d3.xml(path, "image/svg+xml", function(error, xml){
		if (error) throw error;
		//var importedNode = document.importNode(xml.documentElement, true);
    	//svgCard.node().appendChild(importedNode).setAttribute('id', blazons);
    	renderNode(svgCard, xml, blazons);
      var blazonWidth = w - 80;
    	var blazonHeight = h - 80;
    	var blazonX = w/2 - blazonWidth/2;
    	var blazonY = 0;

    	d3.select('#' + blazons)
    	.attr('x', blazonX)
    	.attr('y', blazonY)
    	.attr('width', blazonWidth)
    	.attr('height', blazonHeight);

		var title = svgCard.append('text')
		.text('"' + name + '"')
		.attr("font-size", 24)
		.attr('letter-spacing', 4)
		.attr("font-family", "Bebas Neue");

		var titleWidth = title.node().getBoundingClientRect().width;
		var titleHeight = title.node().getBoundingClientRect().height;
		var titleX = w/2 - titleWidth/2;
		var titleY = blazonHeight + blazonY + 1;
  		title.attr('x', titleX);
  		title.attr('y', titleY);

  		var titleCity = svgCard.append('text')
  		.text(nameCity)
  		.attr('fill', 'rgba(0,0,0,0.5)')
  		.attr("font-size", 12)
  		.attr("font-family", "Lora");

		var titleCityWidth = titleCity.node().getBoundingClientRect().width;
		var titleCityHeight = titleCity.node().getBoundingClientRect().height;
		var titleCityX = w/2 - titleCityWidth/2;
		var titleCityY = titleY + titleHeight;
  		titleCity.attr('x', titleCityX);
  		titleCity.attr('y', titleCityY);
	});

	d3.xml("../images/venzel-corner.svg", "image/svg+xml", function(error, xml){
		if (error) throw error;

    	renderNode(svgCard, xml, 'corner1');
    	renderNode(svgCard, xml, 'corner2');
    	renderNode(svgCard, xml, 'corner3');
    	renderNode(svgCard, xml, 'corner4');
      var _cardId = '#' + cardId;
    	d3.select(_cardId + ' #corner1').attr('x', 16).attr('y', 16);
    	d3.select(_cardId + ' #corner1 path').attr('fill', color);
    	d3.select(_cardId + ' #corner2').attr('x', w - 32 - 16).attr('y', 16);
    	d3.select(_cardId + ' #corner2 path').attr('fill', color).attr('transform', 'rotate(90 16 16)')
    	d3.select(_cardId + ' #corner3').attr('x', w - 32 - 16).attr('y', h - 32 - 16);
    	d3.select(_cardId + ' #corner3 path').attr('fill', color).attr('transform', 'rotate(180 16 16)')
    	d3.select(_cardId + ' #corner4').attr('x', 16).attr('y', h - 32 - 16);
    	d3.select(_cardId + ' #corner4 path').attr('fill', color).attr('transform', 'rotate(-90 16 16)')
	});
  return svgCard;
}

function importNode(xml){
	return document.importNode(xml.documentElement, true);
}

function renderNode(svgNode, xml, id){
	var node = importNode(xml);
	svgNode.node().appendChild(node).setAttribute('id', id);
}

    return module;
})();