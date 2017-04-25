var WhatIsView = require('./views/what_is_burrito.js');
var BurritoInfoList = require('./views/burrito_info_list.js');

var initialize = function(){

  var whatIsView = new WhatIsView();
  var burritoInfoList = new BurritoInfoList();

  burritoInfoList.render();  
  whatIsView.render();




}




window.onload = initialize