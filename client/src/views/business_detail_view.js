var BusinessDetailView = function(business){
this.details = business.details;
}

BusinessDetailView.prototype.createDetailView = function(){
  
  var div = document.createElement('div')
  div.classList.add('infoWindow');

  var nameH1 = document.createElement('p');
  nameH1.classList.add('name');
  nameH1.innerText = this.details.name;

  
    var image = document.createElement('img');
    image.classList.add("businessImage")
    if (this.details.image_url){
      image.src = this.details.image_url;
    }
    else image.innerHTML = "" 
  
  var rating = document.createElement('p');
  rating.innerText = "Rating: " + this.details.rating + "★"

  var price = document.createElement('p');
  if(this.details.price){
    price.innerText = "Price: " + this.details.price
    }
  else price.innerText = "";


  var distance = document.createElement('p');
  distance.innerText = "Distance: " + Math.floor(this.details.distance) + "m"


  var moreInfo = document.createElement('p');
  moreInfo.classList.add("moreInfo")
  moreInfo.innerText = 'get more details';
  moreInfo.addEventListener('click', function(){
    console.log('more Info Clicked')
  })

  div.appendChild(nameH1);
  div.appendChild(image);
  div.appendChild(rating);
  div.appendChild(price);
  div.appendChild(distance);
  div.appendChild(moreInfo);


  return div;
} 


module.exports = BusinessDetailView