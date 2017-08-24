$(document).ready(function() {
    /*====Browsers don't have the require method defined, but Node.js does. 
    With Browserify you can write code that uses require in the same way that you would use it in Node.
    1.  npm install --global browserify 
    2. browserify main.js -o bundle.js //by >cd to the directory public/assets/js/
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
    /*==========================
          functions for assigning attributes to DOM elements
                ===================================*/
    //to assign attribute to node elements
    let setElementAttribute = function(element, attribute, value) {
        element.setAttribute(attribute, value);
    };
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
    //setting different color of the player score based on the score
    changePlayersScoreDisplayColor();
    //for animating the education images and content
    animateEducationSectionImg();
    //for animating the portfolio images and content 
    animatePortfolioSectionImg();
    // validate the contact me form when submitted
    validateContactMeFormSubmit();
    //handling game answer submit
    validateGameResultFormSubmition();
    // github-readme
    displayGithubReadmeContent();
    //to capitlise the list of the repos
    let githubrepolist = document.querySelectorAll('#github-api-data ul li a');
    githubrepolist.forEach(function(element) {
        $(element).css('text-transform', 'capitalize');
    });
    // if ($(window).height() > 568) {
    //     $("#home-section").css("height", $(window).height());
    //     $("#intro-name").css("height", $(window).height() - 130 + "px");
    // }

}); //document ready