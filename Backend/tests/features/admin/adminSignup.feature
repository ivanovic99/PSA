Feature: Admin Signup
  Signing up with valid information should create an admin but if the information is invalid, it should not create an admin. 

   Scenario Outline: Creating valid Admins
      Given I have a valid "<admin>"
      When I create an admin
      Then I should get a success "<message>"

      Examples:
         | admin | message |
         | testing admin | Signup successful. Welcome admin testing admin! |
         | testing admin 2 | Signup successful. Welcome admin testing admin 2! |
         # etc...

   Scenario Outline: Creating invalid Admins
      Given I have an invalid "<admin>"
      When I create an invalid admin
      Then I should get an error 

      Examples:
         | admin |
         | testing admin |
         | testing admin 2 |
         # etc...
