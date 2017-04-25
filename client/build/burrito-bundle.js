/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

var WhatIsView = __webpack_require__(8);
var BurritoInfoList = __webpack_require__(9);

var initialize = function(){

  var whatIsView = new WhatIsView();
  var burritoInfoList = new BurritoInfoList();

  burritoInfoList.render();  
  whatIsView.render();




}




window.onload = initialize

/***/ },

/***/ 8:
/***/ function(module, exports) {

var WhatIsView = function(){

}

WhatIsView.prototype.render = function(){
  div = document.querySelector('#top-right');
  var h2 = document.createElement('h2');
  h2.innerText = "What is a Burriiiiiito anyway?"
  div.appendChild(h2);

  var descriptionP = document.createElement('p');
  var br = document.createElement('br');
  descriptionP.innerText = "A burrito is a type of Mexican and Tex-Mex food, consisting of a large wheat flour tortilla with a filling, wrapped into a closed-ended cylinder, in contrast to a taco, where the tortilla is simply folded around the filling. The flour tortilla is sometimes lightly grilled or steamed to soften it, make it more pliable and allow it to adhere to itself when wrapped. In Mexico, meat and refried beans are sometimes the only fillings. In the United States, burrito fillings may include a combination of ingredients such as Mexican-style rice or plain rice, beans or refried beans, lettuce, salsa, meat, guacamole, cheese, sour cream and various vegetables. Burrito size varies."

  div.appendChild(br);
  div.appendChild(descriptionP);


}

module.exports = WhatIsView;

/***/ },

/***/ 9:
/***/ function(module, exports) {

var BurritoInfoList = function(){

}

BurritoInfoList.prototype.render = function(){
  table = document.querySelector('#table');
  trWhat = document.createElement('tr');
  tdWhat = document.createElement('td');
  tdWhat.innerText = "What is a Burrito?"
  h2 = document.createElement('h2');
  h2.appendChild(tdWhat);
  trWhat.appendChild(tdWhat);

}

module.exports = BurritoInfoList;

/***/ }

/******/ });
//# sourceMappingURL=burrito-bundle.js.map