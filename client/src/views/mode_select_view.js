var ModeSelectView = function(selectElement){
  this.selectElement = selectElement;
  this.onChange = null;
  this.selectElement.addEventListener('change', function(){
    console.log("Hello world");
    this.onChange();
  }.bind(this));
}




module.exports = ModeSelectView;