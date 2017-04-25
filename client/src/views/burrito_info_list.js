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