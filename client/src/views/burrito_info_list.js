var DefaultView = require('./default_view.js')
var WhatIsView = require('./what_is_burrito.js')
var HistoryView = require('./burrito_history_view.js')
var SourcesView = require('./sources_view.js')

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