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
    const animateEducationSectionImg = require("./animateEducationSectionImg");
    //for animating the portfolio images and content
    const animatePortfolioSectionImg = require("./animatePortfolioSectionImg");
    // validate the contact me form when submitted
    const validateContactMeFormSubmit = require("./validateContactMeFormSubmit");
    // validate the contact me form when submitted
    const validateGameResultFormSubmition = require("./validateGameResultFormSubmition");
    //display the content of the github readme file
    const displayGithubReadmeContent = require("./displayGithubReadmeContent");
    //setting different color of the player score based on the score
    const changePlayersScoreDisplayColor = require("./changePlayersScoreDisplayColor");
    //more games
    const moreGames = require("./moreGames");
    //parallax scrolling for the backgrounds
    const parallaxScrolling = require("./parallaxScrolling");
    //to change the active navigation when the user scrolls to different sections
    const changeActiveTopNavigation = require("./changeActiveTopNavigation");
    //to smothly scroll the page when navigated from one section to other
    const smothlyScroll = require("./smothlyScroll");

    /*===============
                                                        landing page typewriter 
                                                               ===================*/
    //typed.js set the speed of the typewriter and the target element
    $(function() {
        $("#typed").typed({
            stringsElement: $("#typed-strings"),
            typeSpeed: 30
        });
    });
    /*===============
                                                    for the hamberger navigation menu in small screns to show and hide the navigation links
                                                     ===================*/
    $(".collapsed").click(function() {
        $(".navbar-wrapper ul").toggle("slow");
    });
    //tweenmax animation of social media links
    TweenMax.from("#typed-strings", 2, {
        right: 0,
        opacity: 0,
        rotation: 90,
        scale: 1
    });

    TweenMax.staggerFrom("#under-typed", 45, {
        y: 0,
        opacity: 0,
        delay: 3.5,
        scale: 0.2,
        ease: Back.easeOut
    });
    TweenMax.staggerFrom(
        "#landing-social-links .badge",
        3, {
            opacity: 0,
            left: 400,
            rotation: 360,
            scale: 0.2,
            delay: 20,
            ease: Back.easeOut
        },
        2
    );

    TweenMax.staggerFrom("#move-down a", 8, {
        y: 0,
        opacity: 0,
        rotation: 360,
        scale: 0.2,
        delay: 38,
        ease: Back.out
    });
    TweenMax.staggerFrom("#move-down i", 10, {
        opacity: 0,
        rotation: 360,
        scale: 0.5,
        delay: 40
    });
    TweenMax.staggerFrom(".hire-me button", 14, {
        y: 0,
        opacity: 0,
        delay: 23,
        scale: 0.1,
        ease: Back.easeOut
    });
    TweenMax.staggerFrom("#hire-me-top-hr", 14, {
        y: 0,
        opacity: 0,
        delay: 37,
        scale: 0.2,
        ease: Back.easeOut
    });
    TweenMax.staggerFrom("#hire-me-bottom-hr", 14, {
        y: 0,
        opacity: 0,
        delay: 37,
        scale: 0.2,
        ease: Back.easeOut
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
    //moregames
    moreGames();
    // validate the contact me form when submitted
    validateContactMeFormSubmit();
    //to capitlise the list of the repos
    let githubrepolist = document.querySelectorAll("#github-api-data ul li a");
    githubrepolist.forEach(function(element) {
        $(element).css("text-transform", "capitalize");
    });
    let date = new Date();
    document.querySelector("#copyrightYear").innerHTML = date.getFullYear();
}); //document readyd