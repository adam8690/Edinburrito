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