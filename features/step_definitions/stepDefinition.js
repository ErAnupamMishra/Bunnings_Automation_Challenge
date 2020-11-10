/** Scenarios/Step Definition file for Loan Borrow Calculator
#Author: anupam.mishra13@gmail.com
#Version : 1.0 
#Status :Published
#Summary : Automation Framework 
*/
const { Given, When, Then } = require('cucumber');
const constTime = 250000;

// GIVEN BDD step
Given('I want to launch {string} URL' , {timeout: constTime}, async function (string) {
  return await this.openBrowser();  
});

Given('I verify the page title' , {timeout: constTime}, async function () {
  // Verifying title for homepage
  return await this.getTitlePage();  
});

// WHEN BDD step

When('I enter person details in Your details column', {timeout: constTime},  async function (dataTable) {
  // Your details section
  return await this.enterDetails(dataTable);
});

When('I enter person earning details in Your earnings column', {timeout: constTime}, async function (dataTable) {
  //Your earning section
  return await this.enterEarnings(dataTable);
});

When('I enter person expense details in Your expenses column', {timeout: constTime}, async function (dataTable) {
  // Your expenses section
  return await this.enterExpenses(dataTable);
});

When('I click on {string} button', {timeout: constTime}, async function (string) {
  // click on button { 'Work out how much calculation' or 'Start over' }
  return await this.clickOnButton(string);
});

// THEN BDD step

Then('I validate borrowing estimate of {string}', {timeout: constTime}, async function (string) {
  // Validate borrowing estimate 
  return await this.validateEstimate(string);
});

Then('I validate Your earnings column', {timeout: constTime}, async function (dataTable) {
  // Validates values in 'Your earning' fields
  return await this.validateEarnings(dataTable);
});

Then('I validate Your expenses column',{ timeout: constTime}, async function (dataTable) {
  // Validate values in 'Your expenses' fields
  return await this.validateExpenses(dataTable);
});

