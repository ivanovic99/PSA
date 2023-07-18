@preLogin_createAdmin
Feature: Admin login
   Loggin in as an admin with valid credentials should return a token and the ID of the admin but when the credentials are invalid it should return an error message

   Scenario Outline: Valid Admin credentials login
      Given I have a valid "<admin>" with valid credentials "<password>" "<adminKey>" already created and I am not logged in
      When I login as an admin
      Then I should get a success "<message>" a token and the ID of the admin

      Examples:
         | admin | password | adminKey | message |
         | preLogin_createAdmin  |  123  |  321  |  Login successful. Welcome admin preLogin_createAdmin!   |
         # etc...

   Scenario Outline: Invalid Admin credentials login
      Given I have a valid "<admin>" with invalid credentials "<password>" "<adminKey>" already created and I am not logged in
      When I login as an admin
      Then I should get an error "<message>"

      Examples:
         | admin | password | adminKey | message |
         | preLogin_createAdmin  |  321  |  123  |  Wrong Password or Key  |
         # etc...