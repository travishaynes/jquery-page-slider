$(document).ready(function(){
  
  if(!window.slider){
    window.slider = new PageSlider();
    slider.bindTo("a[data-remote=true]", "click");
  }
  
});
