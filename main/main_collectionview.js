import Collection from '../collections/lounges';
import Marionette from 'backbone.marionette';
import Template from './main_itemview.hbs';

let childView 	= Marionette.ItemView.extend({
	template 	:  Template ,
	tagName 	: 'article' ,
	className 	: 'lounge'
});

var data = [{
	title	: 'blazon' ,
	blazon 	: 'gerb_spb_blazon.svg' ,
	city	: 'Тюмень' ,
	color 	: '#7DBE6D'
},{
	title	: 'Академия' ,
	blazon 	: 'gerb_spb_academy.svg' ,
	city	: 'Санкт-Петербург' ,
	color 	: '#5F4D9B'
},{
	title	: 'Либерти' ,
	blazon 	: 'gerb_spb_liberty.svg' ,
	city	: 'Санкт-Петербург' ,
	color 	: '#65B6DC'
},{
	title	: 'unity hall' ,
	blazon 	: 'gerb_kazan_unityhall.svg' ,
	city	: 'Казань' ,
	color 	: '#E76144'
}];

export default Marionette.CollectionView.extend({
	childView	: childView ,
	collection 	: new Collection(data) ,

	initialize() { 
		console.log('initialize  collectionview');
	}
});