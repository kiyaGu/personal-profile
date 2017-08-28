# Personal portfolio page
This is a repository for holding my personal portfolio page project. The page is constructed throught using different technologies. 
The following technologies have been in one way or the other used for constructing the application:
#### Frontend 
  * HTML5
  * CSS3
  * Handlebar ([express-handlebar](https://github.com/ericf/express-handlebars)) as a templating engine
  * [Browserify](http://browserify.org/) - To use the power of 'require' in the client/browser side in the same way that it is used in Node at the backend and it helped very much in code refactoring.
  * vanila JavaScript - For adding some behaviour to the frontend and for handling some logics such as form validation, accessing DOM elements and setting attributes, etc.
  * [jQuery](https://jquery.com/) - Used for DOM traversal and manipulation, event handling, animation, and Ajax requests.
#### Backend
  * [Nodejs](https://nodejs.org/en/) + [express.js](https://expressjs.com/) for handling backend logic
  * [nodemailer](https://nodemailer.com/about/) - To send emails from the contact me section
  * [github](https://www.npmjs.com/package/github) - A Node.js wrapper for GitHub API, which is used to accesses the repos and readme files
  * [convert-md](https://www.npmjs.com/package/convert-md) - A Node.js package that converts markdown written files to either HTML,PDF or PNG. Used to convert the README.md files to HTML. 
  * [express-formidable](https://www.npmjs.com/package/express-formidable) - An express middleware for parsing form data.
  * [mongoosejs](http://mongoosejs.com/) - AN elegant mongodb object modeling for node.js. Used to construct the Players database, which is used to populate the leaders' board entry.

