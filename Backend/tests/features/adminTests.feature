Feature: Admin manipulation
  Admin add, edit, delete, get, and get all users

  Scenario Outline: Creating Admins
    Given I have a valid "<admin>"
    When I create an admin
    Then I should get a success "<message>"

    Examples:
      | admin | message |
      | testing admin | Signup successful. Welcome admin testing admin! |
      