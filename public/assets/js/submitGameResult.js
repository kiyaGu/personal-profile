function getCurrentPlayerCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function submitGameResult(endPoint, content) {
    $.ajax({
            url: endPoint,
            method: 'POST',
            data: content
        })
        .done(function(res) {

            //  res.json()
            //  .then(function(res) {
            res = JSON.parse(res);
            document.querySelector('#gameMessage').innerHTML = res.verdict;
            //reset the answer fields
            $('#answer').val("");
            answer.setAttribute("placeholder", "Put what is in your mind");
            //display new operator and operands
            let given = res.inputGiven.number1 + " " + res.inputGiven.operator + " " + res.inputGiven.number2;
            document.querySelector('#given').setAttribute('placeholder', given);
            //clear the previous leaders' board entry
            if ($("#leaderBoard-list").children().length >= 1) {
                $("#leaderBoard-list li").remove();
            }
            //the current players collection
            let playersCollection = res.playersCollection;
            //sort the list based on the score hitgh -> low
            if (playersCollection.length >= 2) {
                playersCollection.sort(function(a, b) {
                    return b.score - a.score;
                });
            }
            //get the cookie value for the current player
            let cookieId = getCurrentPlayerCookie("currentPlayer");

            //display only the top 10 players
            if (playersCollection.length > 10) {
                for (let index = 0; index < 10; index++) {
                    if (playersCollection[index].score == 0) { //make the color of the score cornsilk
                        if (playersCollection[index].name.toLowerCase() === (content.playerName + "-" + cookieId.substring(0, 3))) {
                            $("<li id='" + index + "'><span class='currentPlayer'> You </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score-zero'>" + playersCollection[index].score + "</span></li>").appendTo('#leaderBoard-list');
                        } else {
                            $("<li id='" + index + "'><span class='player-name'>" + playersCollection[index].name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score-zero'>" + playersCollection[index].score + "</span></li>").appendTo('#leaderBoard-list');
                        }
                    } else {
                        if (playersCollection[index].name.toLowerCase() === (content.playerName + "-" + cookieId.substring(0, 3))) {
                            $("<li id='" + index + "'><span class='currentPlayer'> You </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score'>" + playersCollection[index].score + "</span></li>").appendTo('#leaderBoard-list');
                        } else {
                            $("<li id='" + index + "'><span class='player-name'>" + playersCollection[index].name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score'>" + playersCollection[index].score + "</span></li>").appendTo('#leaderBoard-list');
                        }
                    }
                }

            } else { //if there are less than 10 players
                playersCollection.forEach((element) => {

                    if (element.score == 0) { //make the color of the score cornsilk
                        if (element.name.toLowerCase() === (content.playerName + "-" + cookieId.substring(0, 3))) {
                            console.log(res.cookies);
                            $("<li id='" + playersCollection.indexOf(element) + "'><span class='currentPlayer '> You </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score-zero'>" + element.score + "</span></li>").appendTo('#leaderBoard-list');
                        } else {
                            $("<li id='" + playersCollection.indexOf(element) + "'><span class='player-name'>" + element.name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score-zero'>" + element.score + "</span></li>").appendTo('#leaderBoard-list');
                        }
                    } else {
                        if (element.name.toLowerCase() === (content.playerName + "-" + cookieId.substring(0, 3))) {
                            $("<li id='" + playersCollection.indexOf(element) + "'><span class='currentPlayer'> You </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score'>" + element.score + "</span></li>").appendTo('#leaderBoard-list');
                        } else {
                            $("<li id='" + playersCollection.indexOf(element) + "'><span class='player-name'>" + element.name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score'>" + element.score + "</span></li>").appendTo('#leaderBoard-list');
                        }
                    }
                })
            }
        })
        .catch(function(err) {
            console.error(err)
        });
}
module.exports = submitGameResult;