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