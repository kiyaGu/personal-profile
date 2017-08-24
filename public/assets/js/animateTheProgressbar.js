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