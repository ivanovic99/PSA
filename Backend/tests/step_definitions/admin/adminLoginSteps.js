const assert = require('assert');
const axios = require('axios');
const { Given, When, Then } = require('@cucumber/cucumber');

var tokens = [];
var numOfAdminTested = 0;

// Scenario: Login as valid admin with valid credentials

Given("I have a valid {string} with valid credentials {string} {string} already created and I am not logged in", function (admin, password, adminKey) {
   this.admin = {};
   this.admin.email = admin;
   this.admin.password = password;
   this.admin.adminKey = adminKey;
   this.admin.username = admin;
});


When('I login as an admin', async function () {
   try {
      var data = (await axios.post('http://localhost:5000/api/admin/login', this.admin)).data;
      this.message = data.message;
      tokens[numOfAdminTested++] = { token: data.token, id: data.id };
   } catch(error) {
      this.message = error.response.data;
   }
});

Then('I should get a success {string} a token and the ID of the admin', function (message) {
   assert.strictEqual(this.message, message);
   assert.notStrictEqual(tokens[numOfAdminTested - 1].token, undefined);
   assert.notStrictEqual(tokens[numOfAdminTested - 1].id, undefined);
});


// Scenario: Login as valid admin with invalid credentials

Given("I have a valid {string} with invalid credentials {string} {string} already created and I am not logged in", function (admin, password, adminKey) {
   this.admin = {};
   this.admin.email = admin;
   this.admin.password = password;
   this.admin.adminKey = adminKey;
   this.admin.username = admin;
});


Then('I should get an error {string}', function (message) {
   assert.strictEqual(this.message, message);
});

