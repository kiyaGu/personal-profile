//make post request to send the result if there is no error in form validation
const submitGameResult = require('./submitGameResult');

function validateGameResultFormSubmition() {
    //handling game answer submit
    let btnSubmitanswer = document.querySelector('#game-submit-score');
    btnSubmitanswer.addEventListener('click', function(e) {
        e.preventDefault();
        let name = document.querySelector('#playerName');
        let answer = document.querySelector('#answer');
        let gameError = false;
        if (name.value === "") {
            name.setAttribute("class", "animated pulse error-animate");
            name.setAttribute("placeholder", "To play you need to put your name");
            gameError = true;
        } else {
            name.classList.remove("error-animate");
        }
        if (answer.value == "") {
            answer.value = "";
            answer.setAttribute("class", "animated pulse error-animate");
            answer.setAttribute("placeholder", "You should at least guess!!!");
            gameError = true;
        } else if (isNaN(parseInt(answer.value))) {
            if (answer.value.toUpperCase() !== "NAN") {
                answer.value = "";
                answer.setAttribute("class", "animated pulse error-animate");
                answer.setAttribute("placeholder", "put a number or NAN");
                gameError = true;
            } else {
                answer.classList.remove("error-animate");
            }
        } else {
            answer.classList.remove("error-animate");
        }
        if (!(gameError)) {
            // send message to server
            let form = document.querySelector('#send_game_try');
            let formActionUrl = form.action;
            // let formData = new FormData(form);
            let formData = {
                    playerName: name.value,
                    answer: answer.value
                }
                //send the endpoint and the form
            submitGameResult(formActionUrl, formData);
        }
    });
}
module.exports = validateGameResultFormSubmition;