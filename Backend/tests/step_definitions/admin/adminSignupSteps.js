const assert = require('assert');
const axios = require('axios');
const { Given, When, Then } = require('@cucumber/cucumber');


// Scenario: Create a new valid admin

Given('I have a valid {string}', function (admin) {
   this.admin = {
      "email": "email@" + admin + ".com",
  
     "password": "123",
  
     "adminKey": "321",
  
     "username": admin,
     
     "name": "{ type: String, required: false }",
     
     "lastname": "{ type: String, required: false }",
     
     "age": 10000,
     
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


// Scenario: Create a new invalid admin

Given('I have an invalid {string}', function (admin) {
   this.admin = {
      "email": "email@" + admin + ".com",
  
     "password": "123",
  
     "adminKey": "321",
  
     "username": admin,
     
     "name": "{ type: String, required: false }",
     
     "lastname": "{ type: String, required: false }",
     
     "age": 10000,
     
     "nationality": "{ type: String, required: false }",
     
     "adress": "{ type: String, required: false }",
     
     "phone": "[{ type: String, required: false }]"
  };
});

When('I create an invalid admin', async function () {
   try {
      (await axios.post('http://localhost:5000/api/admin/signup', this.admin));
   } catch (error) {
      this.error = error;
      assert.ok(true, 'Error was caught');
   }
});

Then('I should get an error', function () {
   assert.strictEqual(this.error.response.status, 500);
});
