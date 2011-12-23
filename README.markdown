jQuery Page Slider
==================

Dynamically loads the contents of a website using AJAX calls with a page sliding
transition, keeping track of the history using the 
[HTML5 History API](http://www.w3.org/TR/html5/history.html).


Usage
=====

### JavaScript

Here is a basic example on how to use this library:

    $(document).ready(function(){
      // make sure not to re-initialize the slider after a popstate
      if(!window.slider){
        // create a new slider
        window.slider = new PageSlider();
        // bind the slider to any data-remote click events
        slider.bindTo("a[data-remote=true]", "click");
      }
    });

### CSS

The page sliding transition works by animating a `#current-page` div to -100%,
while animating a `#next-page` div to 0%.

Here are the inline CSS rules for the divs:

    #current-page {
      position: absolute;
      left    : 0;
      top     : 0;
      width   : 100%;
    }
    #next-page {
      position: absolute;
      left    : 100%;
      top     : 0;
      width   : 100%;
    }


Documentation
=============

* [Main Documentation](http://travishaynes.github.com/jquery-page-slider)
* [Inline Code Documentation](http://travishaynes.github.com/jquery-page-slider.html)

The inline documentation is built with [docco](http://jashkenas.github.com/docco/)
and can be rebuilt by running `cake docs`.


Building
========

This library is written in CoffeeScript and has a Cakefile to manage the build
tasks. Run `cake build` for a one time build, or `cake watch` to watch the
source and build on changes.
