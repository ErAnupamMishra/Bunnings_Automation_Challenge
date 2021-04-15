#Feature file for Bunnings Search fucntionality for positive scenarios
#Author: anupam.mishra13@gmail.com
#Version : 1.0
#Status :Published
#Summary : Automation Framework in Cucumber (gherkin - BDD) with an open source UI test automation runtime-Puppeteer
#To build automated tests covering various use cases to verify that Search fucntion is working properly
#Problem Statement : Write test automation scripts for newly rolled out search and results features on Bunnings website  
Feature: Positive Scenarios for Bunnings Search functionality
  
Scenario Outline: Open Bunnings Website URL, Enter product details for different positive scenarios

Given I want to launch "Bunnings Website" URL

Given I verify the page title

When I enter item details in Search bar column for "<Search Value>"

When I click on Search button 

Then I validate search result page for "<Result Value>" 
Examples:
    | Test Case No | Search Value | Result Value |
    | 1  | Mirrors  | 6734  |
    | 2  | Living Elements 1200 x 350 x 5mm Flat Edge Mirror  | 1  |
    | 3  | %  | 0  |
