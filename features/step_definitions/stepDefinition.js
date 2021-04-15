/** Scenarios/Step Definition file for Bunnings Search functionality
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

When('I enter item details in Search bar column for {string}', {timeout: constTime},  async function (string) {
  // Search bar section
  await this.enterDetails(string);
  
});

When('I click on Search button', {timeout: constTime},  async function () {
  // click on button Search
  return await this.clickOnButton();
});

// THEN BDD step

Then('I validate search result page for {string}', {timeout: constTime}, async function (string) {
  // Validate borrowing estimate 
  return await this.validateResult(string);
});
