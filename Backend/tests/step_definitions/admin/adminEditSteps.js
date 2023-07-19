const assert = require('assert');
const axios = require('axios');
const { Given, When, Then } = require('@cucumber/cucumber');

// Scenario: Admin edition with correct data
// AND
// Scenario: Admin edition with incorrect data


Given("I am already logged in and on the admin edition page", function () {
   this.editedAdmin = {};
});


When('I fill in the corresponding fields with my new data such as {string} and {string} and submit it', async function (email, age) {
   try {
      this.editedAdmin.email = email;
      this.editedAdmin.age = age;
      this.editedAdmin.username = email;
      var data = (await axios.put('http://localhost:5000/api/admin/' + this.id + "?secret_token=" + this.token, this.editedAdmin)).data;
      this.newEditedAdmin = data.updateAdminById;
      this.message = data.message;
   } catch(error) {
      this.message = error.response.data.error;
   }
});


Then('I should see a message saying {string}', function (message) {
   assert.strictEqual(this.message, message);
});

Then("I should see my new data on the admin edition page", function () {
   assert.strictEqual(this.newEditedAdmin.email, this.editedAdmin.email);
   assert.strictEqual(this.newEditedAdmin.age, +this.editedAdmin.age);
});





