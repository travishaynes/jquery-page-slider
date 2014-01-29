class window.PageSlider
  # selector for the page's main content element
  el: "#main"
  
  # transition easing
  easing: 'linear'
  
  # transition duration
  duration: 'fast'
  
  # adds a "current" class to anchors for the current page
  tagCurrent: true
  
  # binds to the given event of an element (el must have a href property)
  bindTo: (el, event) ->
    pageSlider = this
    $(el).on event, (e) ->
      # make the pages semi-transparent during the transition
      $("#next-page")
        .animate(opacity: 0.25)
      $("#current-page")
        .animate(opacity: 0.25)
        .addClass("loading")
      
      # prevent the anchor's default action
      e.preventDefault()
      
      # do nothing if there is already a slide in transition
      return if pageSlider.sliding > 0
      
      # get the anchor's reference
      url = $(this).attr("href")
      
      # do nothing if the url is currently being viewed
      return if (location.pathname is url)
      
      # get the new page
      $.ajax
        type    : "get"
        url     : url
        error   : (x,s,error) -> throw error
        success : (data) ->
          # parse the HTML
          html = $("<html>").html(data)
          page =
            href    : url
            title   : html.find("title").text()
            content : html.find("#main").html()
          
          # slide to the new page
          pageSlider.slide(page)
          
          # push the history if HTML5 history is available
          if window.history? && window.history.pushState?
            history.pushState(page, page.title, page.href)
  
  # creates a new instance of PageSlider
  constructor: (options = {}) ->
    # variables used in anonymous functions
    pageSlider = this
    
    # set default options
    @el         = options.el          || @el
    @easing     = options.easing      || @easing
    @duration   = options.duration    || @duration
    @tagCurrent = options.tagCurrent  || @tagCurrent
    
    # check whether or not to tag the current page
    if @tagCurrent
      # tag anchors for the current page
      $("a[href='#{location.pathname}']").addClass "current"
    
    # bind to HTML5 pop state if it is available
    if window.history? && window.history.pushState?
      $(window).bind "popstate", (e) ->
        return unless e.originalEvent.state?
        pageSlider.slide(e.originalEvent.state)
    
    # divs for current and next pages
    c = $ "<div>"
    n = $ "<div>"
    
    # extract the page's contents
    m = $(@el).html()
    
    # the current-page div
    c.html(m).attr("id", "current-page").css
      position: "absolute"
      left    : "0"
      top     : "0"
      width   : "100%"
    
    # the next-page div
    n.attr("id", "next-page").css
      position: "absolute"
      left    : "100%"
      top     : "0"
      width   : "100%"
    
    # replace the page's content with the current and next page divs
    $(@el).html("").append(c).append(n)
  
  # slides a page into view
  #     page = {
  #       title   : 'page title',
  #       href    : 'url of page',
  #       contents: 'contents to slide into view'
  #     }
  slide: (page) ->
    # check whether or not to tag the current page
    if @tagCurrent
      # untag anchors for the last page
      $("a.current").removeClass "current"
      
      # tag the current page
      $("a[href='#{page.href}']").addClass "current"
    
    # variables used in anonymous functions
    pageSlider = this
    
    # 2 slides per transition
    @sliding = 2
    
    # replace the document's title with the page's title
    document.title = page.title
    
    # current page transition
    $("#current-page")
      # stop any queued animations
      .stop()
      # remove the loading class
      .removeClass("loading")
      # slide out of view
      .animate {left: "-100%"},
        easing  : @easing
        duration: @duration
        complete: ->
          # make this the next page, and empty its contents
          $(this).html("").attr("id", "next-page").css left: "100%"
          
          # one less slide to go
          pageSlider.sliding -= 1
    
    # next page transition
    $("#next-page")
      # stop any queued animations
      .stop()
      # replace the page content
      .html(page.content)
      # slide into view
      .animate {left: "0%", opacity: 1.0},
        easing  : @easing
        duration: @duration
        complete: ->
          # make this the current page
          $(this).attr "id", "current-page"
          
          # one less slide to go
          pageSlider.sliding -= 1
