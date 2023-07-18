const assert = require('assert');
const axios = require('axios');
const { Given, When, Then } = require('@cucumber/cucumber');

var token = "";

// Scenario: Create a new admin

Given('I have a valid {string}', function (admin) {
   this.admin = {
      "email": "email@" + admin + ".com",
  
     "password": "123",
  
     "adminKey": "321",
  
     "username": admin,
     
     "name": "{ type: String, required: false }",
     
     "lastname": "{ type: String, required: false }",
     
     "age": 10,
     
     "nationality": "{ type: String, required: false }",
     
     "adress": "{ type: String, required: false }",
     
     "phone": "[{ type: String, required: false }]"
  };
});
       
When('I create an admin', async function () {
   this.message = (await axios.post('http://localhost:5000/api/admin/signup', this.admin)).data.message;
});
       
Then('I should get a success {string}', function (message) {
   assert.strictEqual(this.message, message);
});