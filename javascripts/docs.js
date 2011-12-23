$(document).ready(function(){
  
  if(!window.slider){
    window.slider = new PageSlider({
      easing  : 'swing',
      duration: 'slow'
    });
    slider.bindTo("a[data-remote=true]", "click");
  }
  
});
