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