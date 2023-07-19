const assert = require('assert');
const axios = require('axios');
const { Given, When, Then } = require('@cucumber/cucumber');

Given("I am logged in as an admin", function () {
   this.admins = [];
});

When("I get all admins", async function () {
   this.admins = (await axios.get('http://localhost:5000/api/admin' + "?secret_token=" + this.token)).data;
});

Then("I should get a list of all admins", function () {
   assert(this.admins.length, 1, ">");
});