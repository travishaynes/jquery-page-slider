/* Unobtrusively adds the "Fork me on Github" ribbon to the document. */

$(document).ready(function(){
  var ribbonSrc   = "./images/forkme.png",
      ribbonAlt   = "Fork me on Github",
      forkmeHref  = "https://github.com/travishaynes/jquery-page-slider",
      $forkme     = $("<a>"),
      $ribbonImg  = $("<img>");
  
  $ribbonImg
    .attr("src", ribbonSrc)
    .attr("href", ribbonAlt);
  
  $forkme
    .attr("id", "forkme")
    .attr("href", forkmeHref)
    .append($ribbonImg);
  
  $("body").append($forkme);
});
