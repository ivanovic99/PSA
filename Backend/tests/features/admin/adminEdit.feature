@preCreateAdmin
Feature: Admin edition
  As an admin
  I want to edit my information
  So that I can change the my information whenever I want

   @preLoginAdmin
   Scenario Outline: Admin edition with incorrect data
      Given I am already logged in and on the admin edition page
      When I fill in the corresponding fields with my new data such as "<email>" and "<age>" and submit it
      Then I should see a message saying "<message>"

      Examples:
         | email            | age   | message                 |
         | admin@admin | 20000 | Error when updating admin |
      # etc...


   @preLoginAdmin
   Scenario Outline: Admin edition with correct data
      Given I am already logged in and on the admin edition page
      When I fill in the corresponding fields with my new data such as "<email>" and "<age>" and submit it
      Then I should see a message saying "<message>"
      And I should see my new data on the admin edition page

      Examples:
         | email            | age   | message                 |
         | newEmail@newEmail | 20000 | Admin updated successfully |
      # etc...




