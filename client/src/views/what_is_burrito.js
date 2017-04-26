var WhatIsView = function(){

}

WhatIsView.prototype.render = function(){

  div = document.querySelector('#top-right');
  div.innerHTML = ""
  
  var h2 = document.createElement('h2');
  h2.innerText = "What is a Burriiiiiito anyway?"
  div.appendChild(h2);

  var descriptionP = document.createElement('p');

  descriptionP.innerHTML = "<br>A burrito is a type of Mexican and Tex-Mex food, consisting of a large wheat flour tortilla with a filling, wrapped into a closed-ended cylinder, in contrast to a taco, where the tortilla is simply folded around the filling. The flour tortilla is sometimes lightly grilled or steamed to soften it, make it more pliable and allow it to adhere to itself when wrapped. In Mexico, meat and refried beans are sometimes the only fillings. In the United States, burrito fillings may include a combination of ingredients such as Mexican-style rice or plain rice, beans or refried beans, lettuce, salsa, meat, guacamole, cheese, sour cream and various vegetables. Burrito size varies."

  div.appendChild(descriptionP);


}

module.exports = WhatIsView;