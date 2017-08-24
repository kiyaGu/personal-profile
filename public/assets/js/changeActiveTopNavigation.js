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