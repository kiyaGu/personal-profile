(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function animateEducationSectionImg() {
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
                        ++i;
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
                        ++j;
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
                        ++k;
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

}

module.exports = animateEducationSectionImg;
},{}],2:[function(require,module,exports){
function animatePortfolioSectionImg() {
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
                        ++x;
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
                        ++y;
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
                        ++z;
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
}

module.exports = animatePortfolioSectionImg;
},{}],3:[function(require,module,exports){
function animateTheProgressbar() {
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
}
module.exports = animateTheProgressbar;
},{}],4:[function(require,module,exports){
function changeActiveTopNavigation() {

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
}
module.exports = changeActiveTopNavigation;
},{}],5:[function(require,module,exports){
function changePlayersScoreDisplayColor() {
    //setting different color of the player score based on the score
    let playerScore = document.querySelectorAll('#leaderBoard-list .player-score');
    playerScore.forEach((score) => {
        if (score.innerHTML == 0) {
            //make the color of the score cornsilk
            score.className = 'player-score-zero';
        }
    });
}
module.exports = changePlayersScoreDisplayColor;
},{}],6:[function(require,module,exports){
function displayGithubReadmeContent() {
    //for the modal
    let modal = document.getElementById('github-read-me');
    let span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
            modal.style.display = "none";
        }
        //when the user clicks anywhere outside of the modal, close the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    $('#git-repo-list li').click(function(event) {
        event.preventDefault();
        let githubReponame = this.querySelector('a').innerHTML.trim();
        let githubRepoHref = this.querySelector('a').getAttribute('href');
        $.ajax({
                method: "POST",
                url: "/getReadmedata",
                data: { owner: "KiyaGu", repo: githubReponame, url: githubRepoHref }
            })
            .done(function(res) {
                document.querySelector('#github-read-me').style.display = "block";
                $('#read-me-content').html(res);
                document.querySelector('#read-me-link').innerHTML = "<span>You can check it out here</span>&nbsp;&nbsp;<i class='fa fa-lg fa-smile-o' aria-hidden='true'></i>";
                document.querySelector('#read-me-link').setAttribute('href', githubRepoHref);

            });
    });
}
module.exports = displayGithubReadmeContent;
},{}],7:[function(require,module,exports){
function hideNavbarOnScrollDown() {
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
}
module.exports = hideNavbarOnScrollDown;
},{}],8:[function(require,module,exports){
$(document).ready(function() {
    /*====Browsers don't have the require method defined, but Node.js does. 
    With Browserify you can write code that uses require in the same way that you would use it in Node.
    1.  npm install --global browserify 
    2. browserify main.js -o bundle.js //by >cd to the directory public/assets/js/
    =======================*/
    const animateTheProgressbar = require("./animateTheProgressbar");
    //to hide the navbar when the user scrolls down but to show it when they scroll up
    const hideNavbarOnScrollDown = require("./hideNavbarOnScrollDown");
    //for animating the education section images and content
    const animateEducationSectionImg = require('./animateEducationSectionImg');
    //for animating the portfolio images and content
    const animatePortfolioSectionImg = require('./animatePortfolioSectionImg');
    // validate the contact me form when submitted
    const validateContactMeFormSubmit = require('./validateContactMeFormSubmit');
    // validate the contact me form when submitted
    const validateGameResultFormSubmition = require('./validateGameResultFormSubmition');
    //display the content of the github readme file
    const displayGithubReadmeContent = require('./displayGithubReadmeContent');
    //setting different color of the player score based on the score
    const changePlayersScoreDisplayColor = require('./changePlayersScoreDisplayColor');
    //parallax scrolling for the backgrounds
    const parallaxScrolling = require('./parallaxScrolling');
    //to change the active navigation when the user scrolls to different sections
    const changeActiveTopNavigation = require('./changeActiveTopNavigation');
    //to smothly scroll the page when navigated from one section to other
    const smothlyScroll = require('./smothlyScroll');

    /*===============
            landing page typewriter 
                   ===================*/
    //typed.js set the speed of the typewriter and the target element
    $(function() {
        $("#typed").typed({
            stringsElement: $('#typed-strings'),
            typeSpeed: 80
        });
    });
    /*===============
        for the hamberger navigation menu in small screns to show and hide the navigation links
         ===================*/
    $('.collapsed').click(function() {
        $('.navbar-wrapper ul').toggle("slow");
    });

    //to change the active navigation when the user scrolls to different sections
    changeActiveTopNavigation();
    //animate the progressbar/skills bar when the usesr scrolls
    animateTheProgressbar();
    //parallax scrolling for the backgrounds
    parallaxScrolling();
    //hide the navbar on scroll down and show it on scroll up
    hideNavbarOnScrollDown();
    //to smothly scroll the page when navigated from one section to other
    smothlyScroll();
    //for animating the education images and content
    animateEducationSectionImg();
    //for animating the portfolio images and content 
    animatePortfolioSectionImg();
    // github-readme
    displayGithubReadmeContent();
    //handling game answer submit
    validateGameResultFormSubmition();
    //setting different color of the player score based on the score
    changePlayersScoreDisplayColor();
    // validate the contact me form when submitted
    validateContactMeFormSubmit();
    //to capitlise the list of the repos
    let githubrepolist = document.querySelectorAll('#github-api-data ul li a');
    githubrepolist.forEach(function(element) {
        $(element).css('text-transform', 'capitalize');
    });
}); //document ready
},{"./animateEducationSectionImg":1,"./animatePortfolioSectionImg":2,"./animateTheProgressbar":3,"./changeActiveTopNavigation":4,"./changePlayersScoreDisplayColor":5,"./displayGithubReadmeContent":6,"./hideNavbarOnScrollDown":7,"./parallaxScrolling":9,"./smothlyScroll":11,"./validateContactMeFormSubmit":13,"./validateGameResultFormSubmition":14}],9:[function(require,module,exports){
function parallaxScrolling() {
    // $(function() {
    // Cache the Window object
    let $window = $(window);
    // Parallax Backgrounds
    // source: http://code.tutsplus.com/tutorials/a-simple-parallax-scrolling-technique--net-27641
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
    // });
}
module.exports = parallaxScrolling;
},{}],10:[function(require,module,exports){
function sendContactMeMessage(url, data) {
    //to make post request for contact form
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
module.exports = sendContactMeMessage;
},{}],11:[function(require,module,exports){
function smothlyScroll() {
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
}
module.exports = smothlyScroll;
},{}],12:[function(require,module,exports){
function submitGameResult(endPoint, content) {
    $.ajax({
            url: endPoint,
            method: 'POST',
            data: content
        })
        .done(function(res) {

            //  res.json()
            //  .then(function(res) {
            res = JSON.parse(res);
            document.querySelector('#gameMessage').innerHTML = res.verdict;
            //reset the answer fields
            $('#answer').val("");
            answer.setAttribute("placeholder", "Put what is in your mind");
            //display new operator and operands
            let given = res.inputGiven.number1 + " " + res.inputGiven.operator + " " + res.inputGiven.number2;
            document.querySelector('#given').setAttribute('placeholder', given);
            //clear the previous leaders' board entry
            if ($("#leaderBoard-list").children().length >= 1) {
                $("#leaderBoard-list li").remove();
            }
            //the current players collection
            let playersCollection = res.playersCollection;
            //sort the list based on the score hitgh -> low
            if (playersCollection.length >= 2) {
                playersCollection.sort(function(a, b) {
                    return b.score - a.score;
                });
            }
            //display only the top 10 players
            if (playersCollection.length > 10) {
                for (let index = 0; index < 10; index++) {
                    if (playersCollection[index].score == 0) { //make the color of the score cornsilk
                        if (playersCollection[index].name === res.currentPlayer.name) {
                            $("<li id='" + index + "'><span class='currentPlayer'> You </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score-zero'>" + playersCollection[index].score + "</span></li>").appendTo('#leaderBoard-list');
                        } else {
                            $("<li id='" + index + "'><span class='player-name'>" + playersCollection[index].name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score-zero'>" + playersCollection[index].score + "</span></li>").appendTo('#leaderBoard-list');
                        }
                    } else {

                        if (playersCollection[index].name === res.currentPlayer.name) {
                            $("<li id='" + index + "'><span class='currentPlayer'> You </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score'>" + playersCollection[index].score + "</span></li>").appendTo('#leaderBoard-list');
                        } else {
                            $("<li id='" + index + "'><span class='player-name'>" + playersCollection[index].name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score'>" + playersCollection[index].score + "</span></li>").appendTo('#leaderBoard-list');
                        }
                    }
                }

            } else { //if there are less than 10 players
                playersCollection.forEach((element) => {

                    if (element.score == 0) { //make the color of the score cornsilk
                        if (element.name === res.currentPlayer.name) {
                            $("<li id='" + playersCollection.indexOf(element) + "'><span class='currentPlayer '> You </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score-zero'>" + element.score + "</span></li>").appendTo('#leaderBoard-list');
                        } else {
                            $("<li id='" + playersCollection.indexOf(element) + "'><span class='player-name'>" + element.name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score-zero'>" + element.score + "</span></li>").appendTo('#leaderBoard-list');
                        }
                    } else {
                        if (element.name === res.currentPlayer.name) {
                            $("<li id='" + playersCollection.indexOf(element) + "'><span class='currentPlayer'> You </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score'>" + element.score + "</span></li>").appendTo('#leaderBoard-list');
                        } else {
                            $("<li id='" + playersCollection.indexOf(element) + "'><span class='player-name'>" + element.name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score'>" + element.score + "</span></li>").appendTo('#leaderBoard-list');
                        }
                    }
                })
            }
        })
        .catch(function(err) {
            console.error(err)
        });
}
module.exports = submitGameResult;
},{}],13:[function(require,module,exports){
 //make post request to send the message if there is no error in form validation
 const sendContactMeMessage = require('./sendContactMeMessage');

 function validateEmailFormat(email) {
     // regular expression to validate if the email address is in a valid format
     let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return emailRegExp.test(email);
 }
 //check if the passed input filed is empty or not
 function validateInputNotEmpty(element) {
     if (element === "")
         return true;
     else
         return false;
 }
 //if no error remove the error-animate class if it exists
 function removeErrorDisplay(element) {
     document.querySelector(element).classList.remove("error-animate");
 }

 function validateContactMeFormSubmit() {
     /*==========================
             for validating the form and submitting it
                   ===================================*/

     let btnSubmitMessage = document.querySelector('#send-button');
     btnSubmitMessage.addEventListener('click', function(e) {

         e.preventDefault();
         let parent = document.querySelector('#contact-me #contact-form');
         let name = document.querySelector('#name-email');
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
         if (validateInputNotEmpty(name.value)) {
             elementNode.push(name);
         } else {
             removeErrorDisplay('#name-email');
         }
         //validate email address
         if (validateInputNotEmpty(email.value)) {
             // error.push("You need to put your email address");
             elementNode.push(email);
             emailError = true;
         } else {

             //verify the email address and notify success or error
             if (!(validateEmailFormat(email.value))) {
                 emailError = false;
                 elementNode.push(email);
                 emailFormError = "The email address '" + email.value + "' is not valid";
             } else {
                 removeErrorDisplay('#email');
             }
         }
         //validate subjectnumber
         if (validateInputNotEmpty(subject.value)) {
             elementNode.push(subject);
         } else {
             removeErrorDisplay('#subject');
         }
         //validate message content
         if (validateInputNotEmpty(message.value)) {
             elementNode.push(message);
         } else {
             removeErrorDisplay('#message');
         }

         //if there is any error in the above validation display error
         if (elementNode.length > 0) {

             elementNode.forEach(function(element) {
                 // setElementAttribute(element,"placeholder",);
                 element.setAttribute("class", "animated pulse error-animate");
                 if (element.getAttribute('id') === 'name-email') {
                     element.setAttribute("placeholder", nameError);
                 } else if (element.getAttribute('id') === 'email') {
                     if (!(emailError)) {
                         element.value = "";
                         element.setAttribute("placeholder", emailFormError);
                     } else {
                         element.setAttribute("placeholder", emailEmpty);
                     }
                 } else if (element.getAttribute('id') === 'subject') {
                     element.setAttribute("placeholder", subjectError);
                 } else if (element.getAttribute('id') === 'message') {
                     element.setAttribute("placeholder", mesBodyError);
                 }

             });

         } else {
             // send message to server
             let form = document.querySelector('#send_message');
             let formActionUrl = form.action;
             let formData = new FormData(form);
             //make post request to send the message if there is no error in form validation
             //send the endpoint and the form
             sendContactMeMessage(formActionUrl, formData);
         }
     });
 }
 module.exports = validateContactMeFormSubmit;
},{"./sendContactMeMessage":10}],14:[function(require,module,exports){
//make post request to send the result if there is no error in form validation
const submitGameResult = require('./submitGameResult');

function validateGameResultFormSubmition() {
    //handling game answer submit
    let btnSubmitanswer = document.querySelector('#game-submit-score');
    btnSubmitanswer.addEventListener('click', function(e) {
        e.preventDefault();
        let name = document.querySelector('#playerName');
        let answer = document.querySelector('#answer');
        let gameError = false;
        if (name.value === "") {
            name.setAttribute("class", "animated pulse error-animate");
            name.setAttribute("placeholder", "To play you need to put your name");
            gameError = true;
        } else {
            name.classList.remove("error-animate");
        }
        if (answer.value == "") {
            answer.value = "";
            answer.setAttribute("class", "animated pulse error-animate");
            answer.setAttribute("placeholder", "You should at least guess!!!");
            gameError = true;
        } else if (isNaN(parseInt(answer.value))) {
            if (answer.value.toUpperCase() !== "NAN") {
                answer.value = "";
                answer.setAttribute("class", "animated pulse error-animate");
                answer.setAttribute("placeholder", "put a number or NAN");
                gameError = true;
            } else {
                answer.classList.remove("error-animate");
            }
        } else {
            answer.classList.remove("error-animate");
        }
        if (!(gameError)) {
            // send message to server
            let form = document.querySelector('#send_game_try');
            let formActionUrl = form.action;
            // let formData = new FormData(form);
            let formData = {
                    playerName: name.value,
                    answer: answer.value
                }
                //send the endpoint and the form
            submitGameResult(formActionUrl, formData);
        }
    });
}
module.exports = validateGameResultFormSubmition;
},{"./submitGameResult":12}]},{},[8]);
