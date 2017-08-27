 //make post request to send the message if there is no error in form validation
 const sendContactMeMessage = require('./sendContactMeMessage');

 function validateEmailFormat(email) {
     // regular expression to validate if the email address is in a valid format
     let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return emailRegExp.test(email);
 }
 //check if the passed input filed is empty or not
 function validateInputNotEmpty(element) {
     if (element === "")
         return true;
     else
         return false;
 }
 //if no error remove the error-animate class if it exists
 function removeErrorDisplay(element) {
     document.querySelector(element).classList.remove("error-animate");
 }

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
         if (validateInputNotEmpty(name.value)) {
             elementNode.push(name);
         } else {
             removeErrorDisplay('#name-email');
         }
         //validate email address
         if (validateInputNotEmpty(email.value)) {
             // error.push("You need to put your email address");
             elementNode.push(email);
             emailError = true;
         } else {

             //verify the email address and notify success or error
             if (!(validateEmailFormat(email.value))) {
                 emailError = false;
                 elementNode.push(email);
                 emailFormError = "The email address '" + email.value + "' is not valid";
             } else {
                 removeErrorDisplay('#email');
             }
         }
         //validate subjectnumber
         if (validateInputNotEmpty(subject.value)) {
             elementNode.push(subject);
         } else {
             removeErrorDisplay('#subject');
         }
         //validate message content
         if (validateInputNotEmpty(message.value)) {
             elementNode.push(message);
         } else {
             removeErrorDisplay('#message');
         }

         //if there is any error in the above validation display error
         if (elementNode.length > 0) {

             elementNode.forEach(function(element) {
                 // setElementAttribute(element,"placeholder",);
                 element.setAttribute("class", "animated pulse error-animate");
                 if (element.getAttribute('id') === 'name-email') {
                     element.setAttribute("placeholder", nameError);
                 } else if (element.getAttribute('id') === 'email') {
                     if (!(emailError)) {
                         element.value = "";
                         element.setAttribute("placeholder", emailFormError);
                     } else {
                         element.setAttribute("placeholder", emailEmpty);
                     }
                 } else if (element.getAttribute('id') === 'subject') {
                     element.setAttribute("placeholder", subjectError);
                 } else if (element.getAttribute('id') === 'message') {
                     element.setAttribute("placeholder", mesBodyError);
                 }

             });

         } else {
             // send message to server
             let form = document.querySelector('#send_message');
             let formActionUrl = form.action;
             let formData = new FormData(form);
             //make post request to send the message if there is no error in form validation
             //send the endpoint and the form
             sendContactMeMessage(formActionUrl, formData);
         }
     });
 }
 module.exports = validateContactMeFormSubmit;