function submitGameResult(url, data) {
    fetch(url, {
            method: 'POST',
            body: data
        })
        .then(function(res) {
            res.json()
                .then(function(json) {
                    document.querySelector('#gameMessage').innerHTML = json.verdict;
                    //reset the answer fields
                    $('#answer').val("");
                    setElementAttribute(answer, "placeholder", "Put what is in your mind");
                    //display new operator and operands
                    let given = json.inputGiven.number1 + " " + json.inputGiven.operator + " " + json.inputGiven.number2;
                    document.querySelector('#given').setAttribute('placeholder', given);
                })
                .then(function() {
                    $.get("/game", function(data) {
                        if ($("#leaderBoard-list").children().length >= 1) {
                            $("#leaderBoard-list li").remove();
                        }
                        //display only the top 10 players
                        for (let index = 0; index < data.length; index++) {
                            if (data[index].score == 0) { //make the color of the score cornsilk
                                $("<li id='" + index + "'><span class='player-name'>" + data[index].name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score-zero'>" + data[index].score + "</span></li>").appendTo('#leaderBoard-list');
                            } else {
                                $("<li id='" + index + "'><span class='player-name'>" + data[index].name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score'>" + data[index].score + "</span></li>").appendTo('#leaderBoard-list');
                            }
                        }
                    });
                })
        })
        .catch(function(err) {
            console.error(err)
        });
}
module.exports = submitGameResult;