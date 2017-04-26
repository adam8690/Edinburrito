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