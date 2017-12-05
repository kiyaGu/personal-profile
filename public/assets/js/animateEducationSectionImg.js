function animateEducationSectionImg() {
    //for animating the education images and content
    let educationImgArray = [
        "micro2.jpg",
        "cyf.png",
        "certifi_1.jpg",
        "certifi_2.jpg",
        "certifi_3.jpg",
        "certifi_4.jpg",
        "certifi_5.jpg",
        "cardiff2.png"
    ];
    let eduDiscriptionHeadingArray = [
        "MicroLink Information technology College",
        "Code Your Future",
        "Udemy Certificate",
        "Udemy Certificate",
        "Udemy Certificate",
        "Udemy Certificate",
        "Udemy Certificate",
        "Cardiff Metropolitan University"
    ];
    let eduDiscriptionContentArray = [
        "Bsc degree in computer Science<br>Majoring in software Engineering",
        "Intensive Fullstack web development course",
        "A certificate for successfully completing &quot;Learn HTML5 programming From Scratch&quot; Udemy online course.",
        "A certificate for successfully completing &quot;Wordpress theme development with Bootstrap&quot; Udemy online course.",
        "A certificate for successfully completing &quot;JavaScript: understanding the weird parts&quot; Udemy online course.",
        "A certificate for successfully completing &quot;Foundation 5 for beginners&quot; online course.",
        "A certificate for successfully completing &quot;The complete Web developer course&quot; Udemy online course.",
        "MSC in Information Technology"
    ];
    let i = 0,
        j = 0,
        k = 0; // used to accesses the array elements for the comming three functions
    function education_slide() {
        if (i < educationImgArray.length) {
            //fadeOut the current picture and when done as a callback function fadeIn a new image
            $(".slider-education-pic .education-image img").fadeOut(
                1000,
                "swing",
                function() {
                    // fadeIn the next elemnt by replacing a string in the src attribute of the image
                    $(".slider-education-pic .education-image img")
                        .attr("src", "assets/images/" + educationImgArray[i])
                        .fadeIn(3000, "linear", function() {
                            ++i;
                        });
                }
            );
        } else {
            // if i is larger than the array length of the array set i to 0 and restart the transition again
            i = 0;
            $(".slider-education-pic .education-image img").fadeOut(
                1000,
                "swing",
                function() {
                    $(".slider-education-pic .education-image img")
                        .attr("src", "assets/images/" + educationImgArray[i])
                        .fadeIn(3000, "linear");
                }
            );
        }
        if (j < eduDiscriptionHeadingArray.length) {
            //fadeOut the current picture and when done as a callback function fadeIn a new image
            $(".slider-education-content #edu-heading").fadeOut(
                1000,
                "swing",
                function() {
                    // fadeIn the next elemnt by replacing a string in the src attribute of the image
                    $(".slider-education-content #edu-heading")
                        .html(eduDiscriptionHeadingArray[j])
                        .fadeIn(3000, "linear", function() {
                            ++j;
                        });
                }
            );
        } else {
            // if i is larger than the array length of the array set i to 0 and restart the transition again
            j = 0;
            $(".slider-education-content #edu-heading").fadeOut(
                1000,
                "swing",
                function() {
                    $(".slider-education-content #edu-heading")
                        .html(eduDiscriptionHeadingArray[j])
                        .fadeIn(3000, "linear");
                }
            );
        }
        if (k < eduDiscriptionContentArray.length) {
            //fadeOut the current picture and when done as a callback function fadeIn a new image
            $(".slider-education-content #edu-content").fadeOut(
                1000,
                "swing",
                function() {
                    // fadeIn the next elemnt by replacing a string in the src attribute of the image
                    $(".slider-education-content #edu-content")
                        .html(eduDiscriptionContentArray[k])
                        .fadeIn(3000, "linear", function() {
                            ++k;
                        });
                }
            );
        } else {
            // if i is larger than the array length of the array set i to 0 and restart the transition again
            k = 0;
            $(".slider-education-content #edu-content").fadeOut(
                1000,
                "swing",
                function() {
                    $(".slider-education-content #edu-content")
                        .html(eduDiscriptionContentArray[k])
                        .fadeIn(3000, "linear");
                }
            );
        }
    }
    setInterval(education_slide, 5000); //run the function after each 5s
}

module.exports = animateEducationSectionImg;