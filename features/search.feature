@epic:ProductSearch
Feature: Product Search

  Background:
    Given user is on the homepage

  @severity:critical
  Scenario: Search for a valid product
    When search for "bebek arabası" product
    Then the text "bebek arabası" should be visible on the page
    And the text "adet ürün bulundu" should be visible on the page
    Then 'valid' product search results should be visible

  @severity:minor
  Scenario: Search for a non-existent product
    When search for "fkgdlkgfdgmsşldfasşil" product
    Then the text "fkgdlkgfdgmsşldfasşil" should be visible on the page
    And the text "adet ürün bulundu" should be visible on the page
    Then 'invalid' product search results should be visible

  @severity:normal
  Scenario: Search with special characters
    When search for "()%+^&%)%^+%+^=)?" product
    Then the text "()%+^&%)%^+%+^=)?" should be visible on the page
    And the text "adet ürün bulundu" should be visible on the page
    Then 'invalid' product search results should be visible

  @severity:minor
  Scenario: Use auto-suggestion in search
    When user types "bebe" into the "search input" field
    Then "auto-suggestions" should include "bebek"
    When user clicks on the selector "first auto-suggestions"
    Then 'valid' product search results should be visible

  @severity:normal
  Scenario: Check if previously searched product appears in search history
    When search for "bebek arabası" product
    Then the text "bebek arabası" should be visible on the page
    And user is on the homepage
    When user clicks on the selector "search input"
    And the text "Son Aramalar" should be visible on the page
    Then "last search list" should include "bebek arabası"
