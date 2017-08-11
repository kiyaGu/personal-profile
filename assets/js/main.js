// IIFE - Immediately Invoked Function Expression
$(function($, window, document) {
    // The $ is now locally scoped 
    // Listen for the jQuery ready event on the document
   
    //typed.js 
    $(function() {
        $("#typed").typed({
            stringsElement: $('#typed-strings'),
            typeSpeed: 80
        });
    });
   //for animating the progress bar to different sizes
     window.addEventListener('scroll', function() {
        var place = document.body.scrollTop;
        var eTop = $('#animate-progress-bar').offset().top; //get the offset top of the element
        var animateOn = eTop - $(window).scrollTop();
        //start the skills progress bar to animate when the user scrolls to #animate-progress-bar
        if (animateOn < 89) {
            (function move() {
                let id = setInterval(frame, 10);
                function frame() {
                    $(".pr1,.pr2,.pr4,.pr5,.pr6").width("80%");
                    $(".pr3").width("90%");
                    $(".pr8").width("50%");
                    $(".pr7").width("40%");
                    $(".pr10").width("45%");
                    $(".pr9,.pr11, .pr12").width("60%");
                    $('.progress-bar-text').removeClass('progress-bar-text-display');
                    this.removeEventListener('scroll', arguments.callee, false);
                    clearInterval(id);
                }
            })();
              
        }
    });
    //parallax scrolling
    $(function() {
        // Cache the Window object
        var $window = $(window);
        // Parallax Backgrounds
        // Tutorial: http://code.tutsplus.com/tutorials/a-simple-parallax-scrolling-technique--net-27641
        $('section[data-type="background"]').each(function() {
            var $bgobj = $(this); // assigning the object
            $(window).scroll(function() {
                //scroll the background at var speed
                // the yPos is a negative value because we're scrolling it up
                var yPos = -(($window.scrollTop() - $bgobj.offset().top) / $bgobj.data('speed'));
                // put together our final background position
                var coords = '50%' + yPos + 'px';
                //Move the background
                $bgobj.css({ backgroundPosition: coords });
            });
        });
    });
    // $(".home-section").css("height",$(window).height());
    //jQuery to collapse the navbar on scroll
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });
    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });




}(window.jQuery, window, document));
// The global jQuery object is passed as a parameter

if ($(window).height() > 568) {
    $(".home-section").css("height", $(window).height());
    $(".about-me-section").css("height", $(window).height());
    $(".portfolio-section").css("height", $(window).height());
    $("#intro-name").css("height", $(window).height() - 130 + "px");
    //$("#container-row").css("paddingTop",($(window).height()/2)-70+"px"); 
} else {
    $(".home-section").css("height", $(window).height());
    $("#intro-name").css("height", $(window).height() - 130 + "px");
    //   $(".about-me-section").css("height",$(window).height()+50+"px");
}