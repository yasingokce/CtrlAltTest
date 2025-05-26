@epic:UserLogout
Feature: User Logout

    @severity:critical
    @logOutBefore
    Scenario: User successfully logs out
        Given user clicks on the selector "Account Button"
        Then user clicks on the selector "Logout Button"
        And the "homepage" should be displayed
