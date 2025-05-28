@epic:AddToCart
Feature: Add products to cart

  Background:
    Given user navigates to "homepage"
 
  @severity:critical
 Scenario: User adds a valid product to the cart
    When user types "bebek arabası" into the "search input" field
    And user clicks on the selector "first item"
    Then user clicks on the selector "add to cart"
    And the text "Ürün Sepete Eklendi!" should be visible on the page
    
  @severity:minor
  @cartBefore
  Scenario: User views cart after adding a product
    When user types "bebek arabası" into the "search input" field
    And user clicks on the selector "first item"
    Then user clicks on the product "add to cart"
    And the text "Ürün Sepete Eklendi!" should be visible on the page
    And user clicks on the selector "close popup"
    Then user navigates to the cart page
    And check added product