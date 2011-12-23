(function() {
  window.PageSlider = (function() {
    PageSlider.prototype.el = "#main";
    PageSlider.prototype.easing = 'linear';
    PageSlider.prototype.duration = 'fast';
    PageSlider.prototype.tagCurrent = true;
    PageSlider.prototype.bindTo = function(el, event) {
      var pageSlider;
      pageSlider = this;
      return $(el).live(event, function(e) {
        var url;
        e.preventDefault();
        if (pageSlider.sliding > 0) {
          return;
        }
        url = $(this).attr("href");
        if (location.pathname === url) {
          return;
        }
        return $.ajax({
          type: "get",
          url: url,
          error: function(x, s, error) {
            throw error;
          },
          success: function(data) {
            var html, page;
            html = $("<html>").html(data);
            page = {
              href: url,
              title: html.find("title").text(),
              content: html.find("#main").html()
            };
            pageSlider.slide(page);
            if ((window.history != null) && (window.history.pushState != null)) {
              return history.pushState(page, page.title, page.href);
            }
          }
        });
      });
    };
    function PageSlider(options) {
      var c, m, n, pageSlider;
      if (options == null) {
        options = {};
      }
      pageSlider = this;
      this.el = options.el || this.el;
      this.easing = options.easing || this.easing;
      this.duration = options.duration || this.duration;
      this.tagCurrent = options.tagCurrent || this.tagCurrent;
      if (this.tagCurrent) {
        $("a[href='" + location.pathname + "']").addClass("current");
      }
      if ((window.history != null) && (window.history.pushState != null)) {
        $(window).bind("popstate", function(e) {
          if (e.originalEvent.state == null) {
            return;
          }
          return pageSlider.slide(e.originalEvent.state);
        });
      }
      c = $("<div>");
      n = $("<div>");
      m = $(this.el).html();
      c.html(m).attr("id", "current-page").css({
        position: "absolute",
        left: "0",
        top: "0",
        width: "100%"
      });
      n.attr("id", "next-page").css({
        position: "absolute",
        left: "100%",
        top: "0",
        width: "100%"
      });
      $(this.el).html("").append(c).append(n);
    }
    PageSlider.prototype.slide = function(page) {
      var pageSlider;
      if (this.tagCurrent) {
        $("a.current").removeClass("current");
        $("a[href='" + page.href + "']").addClass("current");
      }
      pageSlider = this;
      this.sliding = 2;
      document.title = page.title;
      $("#current-page").stop().animate({
        left: "-100%"
      }, {
        easing: this.easing,
        duration: this.duration,
        complete: function() {
          $(this).html("").attr("id", "next-page").css({
            left: "100%"
          });
          return pageSlider.sliding -= 1;
        }
      });
      return $("#next-page").stop().html(page.content).animate({
        left: "0%"
      }, {
        easing: this.easing,
        duration: this.duration,
        complete: function() {
          $(this).attr("id", "current-page");
          return pageSlider.sliding -= 1;
        }
      });
    };
    return PageSlider;
  })();
}).call(this);
