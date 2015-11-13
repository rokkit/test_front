import {Route} 	from 'backbone-routing';
import View 	from 'main/main';
import $ from 'jquery';

export default Route.extend({

  initialize(options = {}) {
    this.container = options.container;
    this.render();
  } ,

  render() {
    this.view = new View();    
    this.view.render();
    //this.container.show(this.view);
  } ,

});