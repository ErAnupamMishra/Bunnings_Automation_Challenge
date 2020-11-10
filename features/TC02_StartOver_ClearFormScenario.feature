#Feature file for Start Over Button  and Clear Form Functionality
#Author: anupam.mishra13@gmail.com
#Version : 1.0
#Status :Published
#Summary : Automation Framework in Cucumber (gherkin - BDD) with an open source UI test automation runtime-Puppeteer
#To build automated tests covering various use cases to verify that Loan calculator is working properly
#Problem 2 : Clicking the ‘start over’ button clears the form 
Feature: TC02_StartOver_ClearFormScenario  

Scenario: Clear the web page filled form and enable start over functionality

Given I want to launch "home-loan-calculator" URL

Given I verify the page title

When I enter person details in Your details column
|Application Type| Number of dependants | Property you would like to buy|
|     Single     |          0           |        Home to live in        |

When I enter person earning details in Your earnings column
|Your income (before tax)| Your other income | 
|       80000            |       10000       |  

When I enter person expense details in Your expenses column
|Living expenses| Current home loan repayments | Other loan repayments |Other commitments | Total credit card limits | 
|      500      |              0               |         100           |        0         |         10000            |

When I click on "Work out how much I could borrow" button 

When I click on "Start over" button 

Then I validate Your earnings column
|Your income (before tax)| Your other income | 
|       0                |       0           |  

Then I validate Your expenses column
|Living expenses| Current home loan repayments | Other loan repayments |Other commitments | Total credit card limits | 
|       0       |               0              |           0           |        0         |           0              |
