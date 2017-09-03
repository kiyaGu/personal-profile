function moreGames() {
    //for the modal
    let modal = document.getElementById('more-game');
    let closeButton = document.querySelector("#more-game-container .close");
    // When the user clicks on <span> (x), close the modal
    closeButton.onclick = function() {
            modal.style.display = "none";
        }
        //when the user clicks anywhere outside of the modal, close the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    $('#btn-more-game').click(function(event) {
        event.preventDefault();
        document.querySelector('#more-game').style.display = "block";
    });
}
module.exports = moreGames;