function changePlayersScoreDisplayColor() {
    //setting different color of the player score based on the score
    let playerScore = document.querySelectorAll('#leaderBoard-list .player-score');
    playerScore.forEach((score) => {
        if (score.innerHTML == 0) {
            //make the color of the score cornsilk
            score.className = 'player-score-zero';
        }
    });
}
module.exports = changePlayersScoreDisplayColor;