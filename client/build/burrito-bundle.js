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
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

var DefaultView = __webpack_require__(12);
var BurritoInfoList = __webpack_require__(9);

var initialize = function(){

  var defaultView = new DefaultView();
  var burritoInfoList = new BurritoInfoList();

  burritoInfoList.render();
  defaultView.render();
  
}




window.onload = initialize

/***/ },
/* 8 */
/***/ function(module, exports) {

var WhatIsView = function(){

}

WhatIsView.prototype.render = function(){

  div = document.querySelector('#top-right');
  div.innerHTML = ""
  
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

var DefaultView = __webpack_require__(12)
var WhatIsView = __webpack_require__(8)
var HistoryView = __webpack_require__(10)
var SourcesView = __webpack_require__(11)

var BurritoInfoList = function(){
  this.whatIsView = new WhatIsView();
  this.historyView = new HistoryView();
  this.sources = new SourcesView();
}

BurritoInfoList.prototype.render = function(){

  var ul = document.querySelector('#ul');
  var titles = ["What is a Burrito?", "History of the Burrito", "Sources"]

  for (i=0; i < titles.length; i++){
  var li = document.createElement('li');
  li.classList.add('listItem')
  var h2 = document.createElement('h2');
  h2.innerHTML = "<br>" + titles[i];
  h2.id = "item" + i;

  ul.appendChild(li);
  li.appendChild(h2);

  h2.addEventListener('click', function(event){
    var clickedItem = event.path[0].id;
    if(clickedItem === "item0"){
      this.whatIsView.render();
    }
    if(clickedItem === "item1"){
      this.historyView.render()
    }
    if(clickedItem === "item2"){
      this.sources.render()
    }
  }.bind(this))
  

  }
}
module.exports = BurritoInfoList;

/***/ },
/* 10 */
/***/ function(module, exports) {

var HistoryView = function(){

}

HistoryView.prototype.render = function(){

  div = document.querySelector('#top-right');
  div.innerHTML = ""
  
  var h2 = document.createElement('h2');
  h2.innerText = "History of the Burrito"
  div.appendChild(h2);

  var descriptionP = document.createElement('p');
  var br = document.createElement('br');
  descriptionP.innerText = 'One of the most popular stories (likely false) is that a man named Juan Mendez from Chihuahua, Mexico used a donkey to carry around his supplies for his food cart. To keep the food warm, he would wrap it up in a big homemade flour tortilla. First appearing in the early 1900s, right around the time of the Mexican Revolution, this quick, easy food item quickly became popular. Thus, the theory is that the concoction got its name because it was sold out of a donkey cart. Whether Juan Mendez sold burritos on a donkey cart or had something to do with how popular they became, it’s unlikely that he created the burrito. The Diccionario de Mexicanismos has an entry for the burrito as early as 1895, quite a few years before Juan’s time. The entry states that a burrito is “A rolled tortilla with meat or other ingredients inside, called ‘coçito’ in Yucatán and ‘taco’ in the city of Cuernavaca and in Mexico City.” The term burrito was popular in Guanajuato, a state in central Mexico.  As the dictionary entry is the only hard and fast evidence we have to show where burritos came from, the idea that they originated in Guanajuato seems to be the most likely. However the food got its name, it certainly caught on quickly and has evolved a great deal since it was first created. A simple mix of meat, cheese, and tomato has turned into a full-blow meal with rice, beans, meat, cheese, vegetables, and sauces wrapped up in a heavy-duty tortilla.The burrito made its way into the US in the 1900s. The first mention of a burrito on a U.S. menu was in the 1930s at the El Cholo Spanish Café in Los Angeles, though burritos had likely been making the rounds in the states before then. California is still well-known for its burritos, with the Mission burrito—arguably the most popular style of burrito in the United States—originating in San Francisco. The Mission burrito is wrapped up in a tortilla and then again in aluminum foil—this is the sort that is commonly served at restaurants like Chipotle, Qdoba, and Freebirds.Once the US got hold of it, the burrito started to cross cultural boundaries. Now there are burritos made with Thai chicken or Chinese pork. Then there’s the breakfast burrito, a tortilla stuffed with eggs, potato, and bacon. The breakfast burrito fad, which started catching on around 1975, found its way into mainstream fast food restaurants like McDonald’s, Sonic, and Hardee’s by the 1990s. And the rest, as they say, is history.'

  div.appendChild(br);
  div.appendChild(descriptionP);


}

module.exports = HistoryView;

/***/ },
/* 11 */
/***/ function(module, exports) {

var Sources = function(){

}

Sources.prototype.render = function(){
  div = document.querySelector('#top-right');
  div.innerHTML = ""
  
  var h2 = document.createElement('h2');
  h2.innerText = "Sources"
  div.appendChild(h2);

  var ul = document.createElement('ul');
  div.appendChild(ul)

  var sourceLink1 = document.createElement('a')
  sourceLink1.title = "Today I found out"
  sourceLink1.innerHTML = "<br><li>Today I found out</li>"
  sourceLink1.href = "http://www.todayifoundout.com/index.php/2014/04/history-burritos/"

  var sourceLink2 = document.createElement('a')
  sourceLink2.title = "Wikipedia"
  sourceLink2.innerHTML = "<br>Wikipedia"
  sourceLink2.href = "https://en.wikipedia.org/wiki/Burrito"

  ul.appendChild(sourceLink1);
  ul.appendChild(sourceLink2);


}

module.exports = Sources;

/***/ },
/* 12 */
/***/ function(module, exports) {

var DefaultView = function(){

}

DefaultView.prototype.render = function(){

  div = document.querySelector('#top-right');
  div.innerHTML = ""
  
  var h2 = document.createElement('h2');
  h2.innerText = "Instructions"
  div.appendChild(h2);

  var descriptionP = document.createElement('p');
  var br = document.createElement('br');
  descriptionP.innerText = "Hello, welcome to the educational section of the site where you can learn all about burritos! Click on an option from the left column to learn more!"

  div.appendChild(br);
  div.appendChild(descriptionP);


}

module.exports = DefaultView;

/***/ }
/******/ ]);
//# sourceMappingURL=burrito-bundle.js.map