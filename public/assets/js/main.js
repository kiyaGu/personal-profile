// IIFE - Immediately Invoked Function Expression
$(function($, window, document) {
    // The $ is now locally scoped 
    // Listen for the jQuery ready event on the document
    $(".home-section").css("height", $(window).height());
    $("#home").css("height", $(window).height());
    //typed.js 
    $(function() {
        $("#typed").typed({
            stringsElement: $('#typed-strings'),
            typeSpeed: 80
        });
    });
    //for navigation menu in small screns
    $('.collapsed').click(function() {
        $('.navbar-wrapper ul').toggle("slow");
    });


    //setting active li
    $('#top-navigation li').click(function(event) {
        let lists = document.querySelectorAll('#top-navigation li');
        //make all links not-active
        lists.forEach(function(element) {
            $(element).removeClass('active');
        });
        //set the clicked li as active
        $(this).addClass('active');
    })


    //for animating the progress bar to different sizes
    window.addEventListener('scroll', function() {
        let place = document.body.scrollTop;
        let eTop = $('#animate-progress-bar').offset().top; //get the offset top of the element
        let animateOn = eTop - $(window).scrollTop();
        //start the skills progress bar to animate when the user scrolls to #animate-progress-bar
        if (animateOn < 89) {
            (function move() {
                let id = setInterval(frame, 10);

                function frame() {
                    setWidth(".pr1,.pr2,.pr4,.pr5,.pr6", "80%");
                    setWidth(".pr1,.pr2,.pr4,.pr5,.pr6", "80%");
                    setWidth(".pr3", "90%");
                    setWidth(".pr8", "50%");
                    setWidth(".pr7", "40%");
                    setWidth(".pr10", "45%");
                    setWidth(".pr9,.pr11, .pr12", "60%");
                    $('.progress-bar-text').removeClass('progress-bar-text-display');
                    this.removeEventListener('scroll', arguments.callee, false);
                    clearInterval(id);
                }

                function setWidth(element, value) {
                    $(element).width(value);
                }
            })();

        }
    });
    //parallax scrolling
    $(function() {
        // Cache the Window object
        let $window = $(window);
        // Parallax Backgrounds
        // Tutorial: http://code.tutsplus.com/tutorials/a-simple-parallax-scrolling-technique--net-27641
        $('section[data-type="background"]').each(function() {
            let $bgobj = $(this); // assigning the object
            $(window).scroll(function() {
                //scroll the background at var speed
                // the yPos is a negative value because we're scrolling it up
                let yPos = -(($window.scrollTop() - $bgobj.offset().top) / $bgobj.data('speed'));
                // put together our final background position
                let coords = '50%' + yPos + 'px';
                //Move the background
                $bgobj.css({ backgroundPosition: coords });
            });
        });
    });

    //to capitlise the list of the repos
    let githubrepolist = document.querySelectorAll('#github-api-data ul li a');

    githubrepolist.forEach(function(element) {
        $(element).css('text-transform', 'capitalize');
    });
    // Hide Header on scroll down
    let didScroll,
        lastScrollTop = 0,
        delta = 5,
        navbarHeight = $('.navbar-fixed-top').outerHeight();

    $(window).scroll(function(event) {
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        let st = $(this).scrollTop();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('.navbar-fixed-top').removeClass('nav-down').addClass('nav-up animated fadeInDown');
            //to hide the navigation in small screens if it is shown
            if ($(window).width() < 767) {
                $('.navbar-wrapper ul').hide("slow");
            }
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('.navbar-fixed-top').removeClass('nav-up').addClass('nav-down');

            }
        }

        lastScrollTop = st;
    }

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $('a.page-scroll').bind('click', function(event) {
            let $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    //for animating the education images and content

    let educationImgArray = [
        "certifi_1.jpg", "certifi_2.jpg",
        "certifi_3.jpg", "certifi_4.jpg",
        "certifi_5.jpg", "micro2.jpg"
    ];
    let eduDiscriptionHeadingArray = [

        'Udemy Certificate',
        'Udemy Certificate',
        'Udemy Certificate',
        'Udemy Certificate',
        'Udemy Certificate', 'MicroLink Information technology College'
    ];
    let eduDiscriptionContentArray = [
        'A certificate for successfully completing &quot;Learn HTML5 programming From Scratch&quot; Udemy online course.',
        'A certificate for successfully completing &quot;Wordpress theme development with Bootstrap&quot; Udemy online course.',
        'A certificate for successfully completing &quot;JavaScript: understanding the weird parts&quot; Udemy online course.',
        'A certificate for successfully completing &quot;Foundation 5 for beginners&quot; online course.',
        'A certificate for successfully completing &quot;The complete Web developer course&quot; Udemy online course.',
        'Bsc degree in computer Science<br>Majoring in software Engineering'
    ]

    let i = 0,
        j = 0,
        k = 0; // used to accesses the array elements for the comming three functions
    function education_slide() {

        if (i < educationImgArray.length) {
            //fadeOut the current picture and when done as a callback function fadeIn a new image
            $(".slider-education-pic .education-image img").fadeOut(1000, "swing",
                function() {
                    // fadeIn the next elemnt by replacing a string in the src attribute of the image
                    $(".slider-education-pic .education-image img").attr("src", "assets/images/" + educationImgArray[i]).fadeIn(3000, "linear", function() {
                        i++;
                    });
                });
        } else { // if i is larger than the array length of the array set i to 0 and restart the transition again
            i = 0;
            $(".slider-education-pic .education-image img").fadeOut(1000, "swing",
                function() {
                    $(".slider-education-pic .education-image img").attr("src", "assets/images/" + educationImgArray[i]).fadeIn(3000, "linear");
                });
        }


        if (j < eduDiscriptionHeadingArray.length) {
            //fadeOut the current picture and when done as a callback function fadeIn a new image
            $(".slider-education-content #edu-heading").fadeOut(1000, "swing",
                function() {
                    // fadeIn the next elemnt by replacing a string in the src attribute of the image
                    $(".slider-education-content #edu-heading").html(eduDiscriptionHeadingArray[j]).fadeIn(3000, "linear", function() {
                        j++;
                    });
                });
        } else { // if i is larger than the array length of the array set i to 0 and restart the transition again
            j = 0;
            $(".slider-education-content #edu-heading").fadeOut(1000, "swing",
                function() {
                    $(".slider-education-content #edu-heading").html(eduDiscriptionHeadingArray[j]).fadeIn(3000, "linear");
                });
        }



        if (k < eduDiscriptionContentArray.length) {
            //fadeOut the current picture and when done as a callback function fadeIn a new image
            $(".slider-education-content #edu-content").fadeOut(1000, "swing",
                function() {
                    // fadeIn the next elemnt by replacing a string in the src attribute of the image
                    $(".slider-education-content #edu-content").html(eduDiscriptionContentArray[k]).fadeIn(3000, "linear", function() {
                        k++;
                    });
                });
        } else { // if i is larger than the array length of the array set i to 0 and restart the transition again
            k = 0;
            $(".slider-education-content #edu-content").fadeOut(1000, "swing",
                function() {
                    $(".slider-education-content #edu-content").html(eduDiscriptionContentArray[k]).fadeIn(3000, "linear");
                });
        }

    }
    setInterval(education_slide, 5000); //run the function after each 5s

    //for animating the portfolio images and content 

    let portfolioImgArray = ["daily_planner.jpg",
        "horizon2.jpg", "weather.jpg",
        "QUOTE.jpg", "gtg.jpg",
        "postcode.jpg", "iqraa2.jpg"
    ];
    let portfolioDesHeadingArray = [
        '<strong>A Daily Planner application</strong>',
        '<strong>Horizon Tutoring</strong>',
        '<strong>Weather Forcaster</strong>',
        '<strong>My daily quote</strong>: <em>A random quote generator.</em>',
        '<strong>gtg Accountancy Service</strong>',
        '<strong>Post Code Finder</strong>', '<strong>IQRAA foundation UK</strong>'
    ];
    let portfolioDesContentArray = ['<em>Technologies used: HTML5, CSS3, Bootstrap, JavaScript, jQuery</em>',
        '<em>Technologies used: HTML5, CSS3, Bootstrap, JavaScript, jQuery</em>',
        '<em>Technologies used: HTML5, CSS3, Bootstrap, JavaScript, jQuery, APIs</em>',
        '<em>Technologies used: HTML5, CSS3, Bootstrap, JavaScript, jQuery, API</em>',
        '<em>Technologies used: HTML5, CSS3, Bootstrap, JavaScript, jQuery</em>',
        '<em>Technologies used: HTML5, CSS3, Bootstrap, JavaScript, jQuery, APIs</em>',
        '<em>Technologies used: HTML5, CSS3, Bootstrap, JavaScript, jQuery, AJAX, PHP, MySql</em>'
    ]

    let x = 0,
        y = 0,
        z = 0; // used to accesses the array elements for the comming three functions
    function portfolio_slide() {

        if (x < portfolioImgArray.length) {
            //fadeOut the current picture and when done as a callback function fadeIn a new image
            $(".slider-portfolio-pic .slide-item img").fadeOut(1000, "swing",
                function() {
                    // fadeIn the next elemnt by replacing a string in the src attribute of the image
                    $(".slider-portfolio-pic .slide-item img").attr("src", "assets/images/" + portfolioImgArray[x]).fadeIn(3000, "linear", function() {
                        x++;
                    });
                });
        } else { // if i is larger than the array length of the array set i to 0 and restart the transition again
            x = 0;
            $(".slider-portfolio-pic .slide-item img").fadeOut(1000, "swing",
                function() {
                    $(".slider-portfolio-pic .slide-item img").attr("src", "assets/images/" + portfolioImgArray[x]).fadeIn(3000, "linear");
                });
        }


        if (y < portfolioDesHeadingArray.length) {
            //fadeOut the current picture and when done as a callback function fadeIn a new image
            $(".slider-portfolio-content #portfolio-heading").fadeOut(1000, "swing",
                function() {
                    // fadeIn the next elemnt by replacing a string in the src attribute of the image
                    $(".slider-portfolio-content #portfolio-heading").html(portfolioDesHeadingArray[y]).fadeIn(3000, "linear", function() {
                        y++;
                    });
                });
        } else { // if i is larger than the array length of the array set i to 0 and restart the transition again
            y = 0;
            $(".slider-portfolio-content #portfolio-heading").fadeOut(1000, "swing",
                function() {
                    $(".slider-portfolio-content #portfolio-heading").html(portfolioDesHeadingArray[y]).fadeIn(3000, "linear");
                });
        }



        if (z < portfolioDesContentArray.length) {
            //fadeOut the current picture and when done as a callback function fadeIn a new image
            $(".slider-portfolio-content #portfolio-content").fadeOut(1000, "swing",
                function() {
                    // fadeIn the next elemnt by replacing a string in the src attribute of the image
                    $(".slider-portfolio-content #portfolio-content").html(portfolioDesContentArray[z]).fadeIn(3000, "linear", function() {
                        z++;
                    });
                });
        } else { // if i is larger than the array length of the array set i to 0 and restart the transition again
            z = 0;
            $(".slider-portfolio-content #portfolio-content").fadeOut(1000, "swing",
                function() {
                    $(".slider-portfolio-content #portfolio-content").html(portfolioDesContentArray[z]).fadeIn(3000, "linear");
                });
        }

    }
    setInterval(portfolio_slide, 5000); //run the function after each 5s
}(window.jQuery, window, document));
// The global jQuery object is passed as a parameter

if ($(window).height() > 568) {
    $(".home-section").css("height", $(window).height());
    $("#intro-name").css("height", $(window).height() - 130 + "px");
}