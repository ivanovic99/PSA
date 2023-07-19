// hooks.js
const { Before, BeforeAll } = require('@cucumber/cucumber');
const Admin = require('../app/models/Admin'); // Adjust the path as needed
const axios = require('axios');

BeforeAll(async function () {
   try {
      // Start the server
   } catch (error) {
      console.log("error -------->", error);
   }
});

Before({ tags: '@preCreateAdmin' }, async function () {
   try {
      await axios.post('http://localhost:5000/api/admin/signup', {
         "email": "email@" + "preCreateAdmin" + ".com",
     
        "password": "123",
     
        "adminKey": "321",
     
        "username": "preCreateAdmin",
        
        "name": "{ type: String, required: false }",
        
        "lastname": "{ type: String, required: false }",
        
        "age": 10000,
        
        "nationality": "{ type: String, required: false }",
        
        "adress": "{ type: String, required: false }",
        
        "phone": "[{ type: String, required: false }]"
     });
   } catch (error) {
      // console.log("error -------->", error);
   }
});

Before({ tags: '@preLoginAdmin' }, async function () {
   try {
      var data = await axios.post('http://localhost:5000/api/admin/login', {
         "email": "email@" + "preCreateAdmin" + ".com",
         "password": "123",
     
        "adminKey": "321",
     
        "username": "preCreateAdmin",
   });
   this.token = data.data.token;
   this.id = data.data.id;

   } catch (error) {
      // console.log("error -------->", error);
   }
});
