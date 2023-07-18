# Feature: Admin login
#    Loggin in as an admin with valid credentials should return a token and the ID of the admin but when the credentials are invalid it should return an error message

#    Scenario Outline: Admin login
#       Given I have a valid "<admin>" already created and I am not logged in
#       When I login as an admin
#       Then I should get a success "<message>" a token and the ID of the admin

#       Examples:
#          | admin | message |
#          | testing admin | Login successful. Welcome admin testing admin! |
#          | testing admin 2 | Login successful. Welcome admin testing admin 2! |
#          # etc...