let displayMessage = function() {
  const easierPuzzel = require('./easierPuzzel');
  const harderPuzzel = require('./harderPuzzel');
    document.getElementById('resultContainer').innerHTML = "<p id='result' class='animated flash'><span>Congratulation</span>, you won...HURRAH!!!</p>";
    $('#game-timer').countdown('destroy');
    setTimeout(() => {
        document.getElementById('resultContainer').innerHTML = "";
        if (currentGame == "easierPuzzel")
            easierPuzzel();
        else
            harderPuzzel();
    }, 3000);

}

module.exports = displayMessage;
