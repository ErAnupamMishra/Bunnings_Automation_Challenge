#Feature file for Person Borrwoing Estimate
#Author: anupam.mishra13@gmail.com
#Version : 1.0
#Status :Published
#Summary : Automation Framework in Cucumber (gherkin - BDD) with an open source UI test automation runtime-Puppeteer
#To build automated tests covering various use cases to verify that Loan calculator is working properly
#Problem 1 : Calculate home loan borrowing estimate for a single person with spefic details  
Feature: TC01_PersonBorrowingEstimate
  
Scenario: Open Home Loan calculator URL, Enter person details and get borrowing estimate

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

Then I validate borrowing estimate of "$500,000" 
