// force the test environment to 'test'
process.env.NODE_ENV = 'test';
const express = require('express');
// use zombie.js as headless browser
var Browser = require('zombie');
// get the application server module
const app = require('../server');

describe('Testing the math game', function() {
    before(function() {
        this.server = app.listen(3000);
        // initialize the browser using the same port as the test application
        this.browser = new Browser({ site: 'http://localhost:3000' });
    });

    // load the mainpage
    before(function(done) {
        this.browser.visit('/#game-section', done);
    });
    it('should show a game form');
    it('should accept name');
    it('should accept answer');
    it('should refuse invalid answers');
    it('should refuse empty submissions');
    it('should accept complete submissions');

    after(function(done) {
        this.server.close(done);
    });
});