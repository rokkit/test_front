import {Collection} from 'backbone';

import Model from 'models/lounge';

export default Collection.extend({
	url 	: 'http://192.168.1.39:82/api/v1/lounges.json' ,
	model 	: Model
});