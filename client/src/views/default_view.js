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