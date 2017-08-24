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
}

module.exports = animatePortfolioSectionImg;