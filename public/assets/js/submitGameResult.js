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
                     answer.setAttribute("placeholder", "Put what is in your mind");
                     //display new operator and operands
                     let given = json.inputGiven.number1 + " " + json.inputGiven.operator + " " + json.inputGiven.number2;
                     document.querySelector('#given').setAttribute('placeholder', given);
                     //the current players collection
                     let playersCollection = json.playersCollection;
                     //sort the list based on the score hitgh -> low
                     playersCollection.sort(function(a, b) {
                         return b.score - a.score;
                     });
                     if ($("#leaderBoard-list").children().length >= 1) {
                         $("#leaderBoard-list li").remove();
                     }
                     //display only the top 10 players
                     if (playersCollection.length > 10) {
                         for (let index = 0; index < 10; index++) {
                             if (playersCollection[index].score == 0) { //make the color of the score cornsilk
                                 $("<li id='" + index + "'><span class='player-name'>" + playersCollection[index].name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score-zero'>" + playersCollection[index].score + "</span></li>").appendTo('#leaderBoard-list');
                             } else {
                                 $("<li id='" + index + "'><span class='player-name'>" + playersCollection[index].name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score'>" + playersCollection[index].score + "</span></li>").appendTo('#leaderBoard-list');
                             }
                         }

                     } else { //if there are less than 10 players
                         playersCollection.forEach((element) => {

                             if (element.score == 0) { //make the color of the score cornsilk
                                 $("<li id='" + playersCollection.indexOf(element) + "'><span class='player-name'>" + element.name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score-zero'>" + element.score + "</span></li>").appendTo('#leaderBoard-list');
                             } else {
                                 $("<li id='" + playersCollection.indexOf(element) + "'><span class='player-name'>" + element.name + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='player-score'>" + element.score + "</span></li>").appendTo('#leaderBoard-list');
                             }
                         })
                     }
                 })
         })
         .catch(function(err) {
             console.error(err)
         });
 }
 module.exports = submitGameResult;