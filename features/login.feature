@epic:UserLoggin
Feature: Login Process
  #first steps something like before all
  Background:
    Given user is on the login page
    When user clicks on the locator "loggin button with eMail"
    Then the placeholder text "E-posta adresiniz" should be displayed
    And user clicks on the selector "Email textbox"

  @severity:critical
  Scenario: User logs in with correct information
    Then user logs in with "valid username" and "valid password"
    And user login "successful"

  @severity:normal
  Scenario: Username is correct password is wrong
    Then user logs in with "valid username" and "invalid password"
    And user login "failed"

  @severity:normal
  Scenario: Username is correct password is empty
    Then user logs in with "valid username" and "empty password"
    And user login "require password"

  @severity:minor
  Scenario: Username is wrong
    Then user logs in with "invalid username"
    And user login "require true Email"

  @severity:minor
  Scenario: Empty username
    Then user logs in with "empty username"
    And user login "empty username"




#Scenario: admin entered or sql injection
###Scenario: phone number ??? --------------



