function sendContactMeMessage(url, data) {
    //to make post request for contact form
    fetch(url, {
            method: 'POST',
            body: data
        })
        .then(function(res) {
            res.json()
                .then(function(json) {
                    alert(json.message);
                    document.querySelector('#send_message').reset();
                })
        })
        .catch(function(err) {
            console.error(err)
        });

}
module.exports = sendContactMeMessage;