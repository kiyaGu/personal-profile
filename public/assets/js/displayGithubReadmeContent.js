function displayGithubReadmeContent() {
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
}
module.exports = displayGithubReadmeContent;