import Route from 'community/route';

export default class Community{
	constructor(container){
		this.container = container;
	}

	route(){
		return new Route({
			container: this.container
		});
	}
}