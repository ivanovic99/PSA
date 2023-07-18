// hooks.js
const { Before, BeforeAll } = require('@cucumber/cucumber');
const Admin = require('../app/models/Admin'); // Adjust the path as needed
const axios = require('axios');

BeforeAll({ tags: '@preLogin_createAdmin' }, async function () {
   try {
      await axios.post('http://localhost:5000/api/admin/signup', {
         "email": "email@" + "preLogin_createAdmin" + ".com",
     
        "password": "123",
     
        "adminKey": "321",
     
        "username": "preLogin_createAdmin",
        
        "name": "{ type: String, required: false }",
        
        "lastname": "{ type: String, required: false }",
        
        "age": 10000,
        
        "nationality": "{ type: String, required: false }",
        
        "adress": "{ type: String, required: false }",
        
        "phone": "[{ type: String, required: false }]"
     });
     console.log("Admin created!");
   } catch (error) {
      console.log("error -------->", error);
   }
});
