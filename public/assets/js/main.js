$(document).ready(function() {
    /*====Browsers don't have the require method defined, but Node.js does. 
    With Browserify you can write code that uses require in the same way that you would use it in Node. 
    =========*/
    const animateTheProgressbar = require("./animateTheProgressbar");
    //to hide the navbar when the user scrolls down but to show it when they scroll up
    const hideNavbarOnScrollDown = require("./hideNavbarOnScrollDown");
    //for animating the education section images and content
    const animateEducationSectionImg = require('./animateEducationSectionImg');
    //for animating the portfolio images and content
    const animatePortfolioSectionImg = require('./animatePortfolioSectionImg');
    // validate the contact me form when submitted
    const validateContactMeFormSubmit = require('./validateContactMeFormSubmit');
    //make post request to send the message if there is no error in form validation
    const sendContactMeMessage = require('/sendContactMeMessage');

    /*===============
            lnading page typed.js ===================*/
    //typed.js set the speed of the typewriter and the target element
    $(function() {
        $("#typed").typed({
            stringsElement: $('#typed-strings'),
            typeSpeed: 80
        });
    });
    //for the hamberger navigation menu in small screns
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

    //animate the progressbar/skills bar when the usesr scrolls
    animateTheProgressbar();

    //parallax scrolling
    $(function() {
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
    });

    //to capitlise the list of the repos
    let githubrepolist = document.querySelectorAll('#github-api-data ul li a');
    githubrepolist.forEach(function(element) {
        $(element).css('text-transform', 'capitalize');
    });
    //hide the navbar on scroll down and show it on scroll up
    hideNavbarOnScrollDown();

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

    //setting different color of the player score based on the score
    let playerScore = document.querySelectorAll('#leaderBoard-list .player-score');
    playerScore.forEach((score) => {
        if (score.innerHTML == 0) {
            //make the color of the score cornsilk
            score.className = 'player-score-zero';
        }
    });

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
        //for animating the education images and content
    animateEducationSectionImg();

    //for animating the portfolio images and content 
    animatePortfolioSectionImg();



    // if ($(window).height() > 568) {
    //     $("#home-section").css("height", $(window).height());
    //     $("#intro-name").css("height", $(window).height() - 130 + "px");
    // }

    /*==========================
          functions for assigning attributes to DOM elements
                ===================================*/
    //to assign attribute to node elements
    let setElementAttribute = function(element, attribute, value) {
        element.setAttribute(attribute, value);
    };

    // validate the contact me form when submitted

    validateContactMeFormSubmit();
    //make post request to send the message if there is no error in form validation
    sendContactMeMessage();



    /*==========================
          functions for assigning attributes to DOM elements
                ===================================*/
    //to assign attribute to node elements
    let setElementAttribute = function(element, attribute, value) {
        element.setAttribute(attribute, value);
    };
    //handling game answer submit
    let btnSubmitanswer = document.querySelector('#game-submit-score');
    btnSubmitanswer.addEventListener('click', function(e) {
        e.preventDefault();
        let name = document.querySelector('#playerName');
        let answer = document.querySelector('#answer');
        let gameError = false;
        if (name.value === "") {
            setElementAttribute(name, "class", "animated pulse error-animate");
            setElementAttribute(name, "placeholder", "To play you need to put your name");
            gameError = true;
        } else {
            name.classList.remove("error-animate");
        }
        if (answer.value == "") {
            answer.value = "";
            setElementAttribute(answer, "class", "animated pulse error-animate");
            setElementAttribute(answer, "placeholder", "You should at least guess!!!");
            gameError = true;
        } else if (isNaN(parseInt(answer.value))) {
            if (answer.value.toUpperCase() !== "NAN") {
                answer.value = "";
                setElementAttribute(answer, "class", "animated pulse error-animate");
                setElementAttribute(answer, "placeholder", "put a number or NAN");
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
            let formData = new FormData(form);
            //send the endpoint and the form
            gameResult(formActionUrl, formData);
        }
    });
    //to make post request to the server
    function gameResult(url, data) {
        fetch(url, {
                method: 'POST',
                body: data
            })
            .then(function(res) {
                res.json()
                    .then(function(json) {
                        document.querySelector('#gameMessage').innerHTML = json.verdict;
                        //reset the answer fields
                        $('#answer').val("");
                        setElementAttribute(answer, "placeholder", "Put what is in your mind");
                        //display new operator and operands
                        let given = json.inputGiven.number1 + " " + json.inputGiven.operator + " " + json.inputGiven.number2;
                        document.querySelector('#given').setAttribute('placeholder', given);
                    })
                    .then(function() {
                        $.getJSON("data/players.json", function(data) {
                            //sort the data according to their score
                            // sort by value
                            data.sort(function(a, b) {
                                return b.score - a.score;
                            });
                            //check if it has child - remove the previous list
                            if ($("#leaderBoard-list").children().length >= 1) {
                                $("#leaderBoard-list li").remove();
                            }
                            $.each(data, function(key, val) {
                                if (val.score == 0) { //make the color of the score cornsilk
                                    $("<li id='" + key + "'><span class='player-name'>" + val.name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score-zero'>" + val.score + "</span></li>").appendTo('#leaderBoard-list');
                                } else {
                                    $("<li id='" + key + "'><span class='player-name'>" + val.name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score'>" + val.score + "</span></li>").appendTo('#leaderBoard-list');
                                }

                            });
                        });
                    })
            })
            .catch(function(err) {
                console.error(err)
            });
    }
    // github-readme
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
                //to remove the header from the content that is sent
                // let n = res.data.indexOf("\n");
                // let content = res.data.substr(n);
                document.querySelector('#github-read-me').style.display = "block";
                // let response = JSON.parse(request.responseText);
                // document.querySelector('#read-me-heading').innerHTML = githubReponame;
                $('#read-me-content').html(res);
                document.querySelector('#read-me-link').innerHTML = "<span>You can check it out here</span>&nbsp;&nbsp;<i class='fa fa-lg fa-smile-o' aria-hidden='true'></i>";
                document.querySelector('#read-me-link').setAttribute('href', githubRepoHref);

            });
    });
}); //document ready