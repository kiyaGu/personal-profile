   $(document).ready(function() {
       //    window.location.replace("/getReadme");
       let lists = document.querySelectorAll('#top-navigation li');
       //make all links not-active
       lists.forEach(function(element) {
           $(element).removeClass('active');
       });
       $('#readme-content').text("");
       $.ajax({
               method: "POST",
               url: "/getReadme",
               data: { owner: "KiyaGu", repo: githubReponame, url: githubRepoHref }
           })
           .done(function(res) {
               console.log(res.data);
               // window.location.replace("/getReadme");
           });
       //navigating back to the page
       $('#top-navigation li').click(function(event) {

           event.preventDefault();
           //get all the childrens of the li
           let linkElement = $(this).children();
           //out of the childrens get the link
           linkElementHref = linkElement[0].getAttribute('href');
           window.location.replace("/" + linkElementHref);

           //    $.ajax("/githubreadmeBack");
       })
   });