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
                    $.getJSON("data/players.json", function(data) {
                        //sort the data according to their score
                        // sort by value
                        data.sort(function(a, b) {
                            return b.score - a.score;
                        });
                        //check if it has child - remove the previous list
                        if ($("#leaderBoard-list").children().length >= 1) {
                            $("#leaderBoard-list li").remove();
                        }
                        $.each(data, function(key, val) {
                            if (val.score == 0) { //make the color of the score cornsilk
                                $("<li id='" + key + "'><span class='player-name'>" + val.name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score-zero'>" + val.score + "</span></li>").appendTo('#leaderBoard-list');
                            } else {
                                $("<li id='" + key + "'><span class='player-name'>" + val.name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score'>" + val.score + "</span></li>").appendTo('#leaderBoard-list');
                            }

                        });
                    });
                })
        })
        .catch(function(err) {
            console.error(err)
        });
}
module.exports = submitGameResult;