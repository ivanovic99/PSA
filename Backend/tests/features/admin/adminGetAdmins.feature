@preCreateAdmin
Feature: Get all admins
   @preLoginAdmin
   Scenario: Get all admins
      Given I am logged in as an admin
      When I get all admins
      Then I should get a list of all admins
