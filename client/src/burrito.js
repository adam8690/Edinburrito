var DefaultView = require('./views/default_view');
var BurritoInfoList = require('./views/burrito_info_list.js');

var initialize = function(){

  var defaultView = new DefaultView();
  var burritoInfoList = new BurritoInfoList();

  burritoInfoList.render();
  defaultView.render();
  
}




window.onload = initialize