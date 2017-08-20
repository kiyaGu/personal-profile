$(document).ready(function() {
    // The $ is now locally scoped 
    // Listen for the jQuery ready event on the document
    $("#home-section").css("height", $(window).height());
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

    //to change the active navigation when the user scrolls to different sections
    $(document).on("scroll", (event) => {
        let scrollPos = $(document).scrollTop();
        let eduSection = $('#education-section');
        let experienceSection = $('#experience-section');
        let skillsSection = $('#skills-section');
        //to make the navigation resume link to stay active for the sections education, skills and experience
        resumeSecHeight = eduSection.height() + skillsSection.height() + experienceSection.height()
        $('#top-navigation a').each(function() {
            let currLink = $(this);

            let refElement = $(currLink.attr("href"));

            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('#top-navigation li').removeClass("active");
                $(currLink[0].parentElement).addClass("active");

            } else if (eduSection.position().top <= scrollPos && eduSection.position().top + resumeSecHeight > scrollPos) {
                $('#top-navigation li').removeClass("active");
                //make the Resume link active for the education, skills and experience sections
                $('#top-navigation li#eduLi').addClass("active");
            } else {
                $(currLink[0].parentElement).removeClass("active");
            }

        });

    });


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
                //scroll the background at let speed
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
        '<strong>My daily quote</strong>: <span id="quote"><em>A&nbsp;random&nbsp;quote&nbsp;generator.</em></span>',
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


    if ($(window).height() > 568) {
        $("#home-section").css("height", $(window).height());
        $("#intro-name").css("height", $(window).height() - 130 + "px");
    }

    /*==========================
          functions for assigning attributes to DOM elements
                ===================================*/
    //to assign attribute to node elements
    let setElementAttribute = function(element, attribute, value) {
        element.setAttribute(attribute, value);
    };

    /*==========================
        for validating the form and submitting it
              ===================================*/

    let btnSubmitMessage = document.querySelector('#send-button');
    btnSubmitMessage.addEventListener('click', function(e) {
        e.preventDefault();
        let parent = document.querySelector('#contact-me #contact-form');

        //if the error is already displayed and the user submits agains
        //remove the previous error and check again
        if (parent.contains(document.querySelector('#errorContainer'))) {
            parent.removeChild(document.querySelector('#errorContainer'));
        }
        let name = document.querySelector('#name');
        let email = document.querySelector('#email');
        let phoneNumber = document.querySelector('#subject');
        let message = document.querySelector('#message');

        //to identify the error type of email
        let emailError;

        let nameError = "your name is needed";
        let emailEmpty = "email address is required";
        let emailFormError;
        let subjectError = "subject is required";
        let mesBodyError = "no empty message allowed";

        //to hold element that has an error 
        let elementNode = [];
        //validate full name
        if (name.value === "") {
            elementNode.push(name);
        } else {
            document.querySelector('#name').classList.remove("error-animate");
        }
        //validate email address
        if (email.value === "") {
            // error.push("You need to put your email address");
            elementNode.push(email);
            emailError = true;
        } else {
            // regular expression to validate if the email address is in a valid format
            let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            //verify the email address and notify success or error
            if (!(emailRegExp.test(email.value))) {
                emailError = false;
                elementNode.push(email);
                emailFormError = "The email address '" + email.value + "' is not valid";
            } else {
                document.querySelector('#email').classList.remove("error-animate");
            }
        }
        //validate subjectnumber
        if (subject.value === "") {
            elementNode.push(subject);
        } else {
            document.querySelector('#subject').classList.remove("error-animate");
        }
        //validate message content
        if (message.value === "") {
            elementNode.push(message);
        } else {
            document.querySelector('#message').classList.remove("error-animate");
        }

        //if there is any error in the above validation display error
        if (elementNode.length > 0) {
            elementNode.forEach(function(element) {
                // setElementAttribute(element,"placeholder",);
                setElementAttribute(element, "class", "animated pulse error-animate");
                if (element.getAttribute('id') === 'name') {
                    setElementAttribute(element, "placeholder", nameError);
                } else if (element.getAttribute('id') === 'email') {
                    if (!(emailError)) {
                        element.value = "";
                        setElementAttribute(element, "placeholder", emailFormError);
                    } else {
                        setElementAttribute(element, "placeholder", emailEmpty);
                    }
                } else if (element.getAttribute('id') === 'subject') {
                    setElementAttribute(element, "placeholder", subjectError);
                } else if (element.getAttribute('id') === 'message') {
                    setElementAttribute(element, "placeholder", mesBodyError);
                }

            });

        } else {
            // send message to server
            let form = document.querySelector('#send_message');
            let formActionUrl = form.action;
            let formData = new FormData(form);
            //send the endpoint and the form
            messages(formActionUrl, formData);
        }
    });
    //to make post request for contact form
    function messages(url, data) {
        fetch(url, {
                method: 'POST',
                body: data
            })
            .then(function(res) {
                res.json()
                    .then(function(json) {
                        alert(json.message);
                        document.querySelector('#send_message').reset();
                    })
            })
            .catch(function(err) {
                console.error(err)
            });
    }

    //handling game answer submit
    let btnSubmitanswer = document.querySelector('#game-submit-score');
    btnSubmitanswer.addEventListener('click', function(e) {
        e.preventDefault();

        sessionStorage.setItem("player", $('#name').val());

        // send message to server
        let form = document.querySelector('#send_game_try');
        let formActionUrl = form.action;
        let formData = new FormData(form);
        //send the endpoint and the form
        gameResult(formActionUrl, formData);
    });
    //to make post request to the server
    function gameResult(url, data) {
        fetch(url, {
                method: 'POST',
                body: data
            })
            .then(function(res) {
                console.log(res);


                ///


                res.json()
                    .then(function(json) {

                        //         console.log(shrinkr);
                        //         //display leaderboard
                        //         // $('#result-and-leaderBoard').removeClass('hidden');

                        //         // document.querySelector('#leader').innerHTML = json.currentPlayer.name + "&nbsp;&nbsp;&nbsp;&nbsp;" + json.currentPlayer.score;
                        //         //display success or error
                        document.querySelector('#gameMessage').innerHTML = json.verdict;
                        //         //reset the fields
                        document.querySelector('#send_game_try').reset();
                        //         //display new operator and operands
                        let given = json.inputGiven.number1 + " " + json.inputGiven.operator + " " + json.inputGiven.number2;
                        //         console.log(json.currentPlayer.name, json.currentPlayer.score);
                        document.querySelector('#given').setAttribute('placeholder', given);
                    })
            })
            .catch(function(err) {
                console.error(err)
            });
    }

});