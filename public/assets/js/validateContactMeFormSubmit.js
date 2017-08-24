function validateContactMeFormSubmit() {
    /*==========================
            for validating the form and submitting it
                  ===================================*/

    let btnSubmitMessage = document.querySelector('#send-button');
    btnSubmitMessage.addEventListener('click', function(e) {

        e.preventDefault();
        let parent = document.querySelector('#contact-me #contact-form');
        let name = document.querySelector('#name-email');
        let email = document.querySelector('#email');
        let phoneNumber = document.querySelector('#subject');
        let message = document.querySelector('#message');

        //to identify the error type of email
        let emailError;

        let nameError = "your name is needed";
        let emailEmpty = "email address is required";
        let emailFormError;
        let subjectError = "subject is required";
        let mesBodyError = "no empty message allowed";

        //to hold element that has an error 
        let elementNode = [];
        //validate full name
        if (name.value === "") {
            elementNode.push(name);
        } else {
            document.querySelector('#name-email').classList.remove("error-animate");
        }
        //validate email address
        if (email.value === "") {
            // error.push("You need to put your email address");
            elementNode.push(email);
            emailError = true;
        } else {
            // regular expression to validate if the email address is in a valid format
            let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            //verify the email address and notify success or error
            if (!(emailRegExp.test(email.value))) {
                emailError = false;
                elementNode.push(email);
                emailFormError = "The email address '" + email.value + "' is not valid";
            } else {
                document.querySelector('#email').classList.remove("error-animate");
            }
        }
        //validate subjectnumber
        if (subject.value === "") {
            elementNode.push(subject);
        } else {
            document.querySelector('#subject').classList.remove("error-animate");
        }
        //validate message content
        if (message.value === "") {
            elementNode.push(message);
        } else {
            document.querySelector('#message').classList.remove("error-animate");
        }

        //if there is any error in the above validation display error
        if (elementNode.length > 0) {

            elementNode.forEach(function(element) {
                // setElementAttribute(element,"placeholder",);
                setElementAttribute(element, "class", "animated pulse error-animate");
                if (element.getAttribute('id') === 'name-email') {
                    setElementAttribute(element, "placeholder", nameError);
                } else if (element.getAttribute('id') === 'email') {
                    if (!(emailError)) {
                        element.value = "";
                        setElementAttribute(element, "placeholder", emailFormError);
                    } else {
                        setElementAttribute(element, "placeholder", emailEmpty);
                    }
                } else if (element.getAttribute('id') === 'subject') {
                    setElementAttribute(element, "placeholder", subjectError);
                } else if (element.getAttribute('id') === 'message') {
                    setElementAttribute(element, "placeholder", mesBodyError);
                }

            });

        } else {
            // send message to server
            let form = document.querySelector('#send_message');
            let formActionUrl = form.action;
            let formData = new FormData(form);
            //send the endpoint and the form
            sendContactMeMessage(formActionUrl, formData);
        }
    });
}
module.exports = validateContactMeFormSubmit;