/** Scenarios/Step Function file for Loan Borrow Calculator
#Author: anupam.mishra13@gmail.com
#Version : 1.0 
#Status :Published
#Summary : To be called by Step definitions files for all fucntions and scenarios in Automation Framework 
*/
const puppeteer = require('puppeteer');
const assert = require('assert');
const { Before, After, setWorldConstructor } = require('cucumber');

const myurl = "https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/";
//Few variables
var xpath = '';
var actualValue = '';
Before((scenario) => {
  this.scenarioName = scenario.pickle.name;
  console.log(this.scenarioName);
});
Before(function () {
  console.log("\n-----------------Test Scenario has started----------------------\n ");
});

After(function () {
  console.log("\n-----------------Test Scenario has ended------------------------\n ");
  return this.closeBrowser();
});
/*
//Local Testing xpath filters, can be deleted
(async () => {
  
//Initialize the XPaths elements 
const browser = await puppeteer.launch({headless: false, args: ['--start-maximized', '--window-size=1920,1080']});
const page = await browser.newPage();
const application_type_single = await page.$x('//input[@id="application_type_single"]'); //Application type for single
console.log("anupam mishra");
const application_type_joint = await page.$x('//input[@id="application_type_joint"]'); //Application Type for joint
const number_of_dependants = await page.$x('//select[@title="Number of dependants"]'); //Number of dependants
const number_of_dependants_option = await page.$x('//select[@title="Number of dependants"]/option'); //Number of dependants options
const borrower_type_home = await page.$x('//*[@id="borrow_type_home"]'); //Borrower type home
const borrower_type_investment = await page.$x('//*[@id="borrow_type_investment"]'); //Borrower type investment
const your_income = await page.$x('//input[@aria-labelledby="q2q1"]'); //  Your Income
const your_other_income = await page.$x('//input[@aria-labelledby="q2q2"]'); //Your other income
const living_expenses = await page.$x('//input[@aria-labelledby="q3q1"]'); //Living Expenses
const current_home_loan_repayments = await page.$x('//input[@aria-labelledby="q3q2"]'); //Current Home Loan Repayments 
const other_loan_repayments = await page.$x('//input[@aria-labelledby="q3q3"]'); //Current Home Loan Repayments 
const other_commitments = await page.$x('//input[@aria-labelledby="q3q4"]'); //Other Commitments
const total_credit_card_limits = await page.$x('//input[@aria-labelledby="q3q5"]'); //Current Home Loan Repayments 
const calculate_button = await page.$x('//button[contains(., "Work out how much I could borrow")]');
const start_over_button = await page.$x('//button[@class="start-over"]'); //Start Over button
const estimate_amount = await page.$x('//*[@id="borrowResultTextAmount"]'); //Estimated amount
const error_text = await page.$x('//span[@class="borrow__error__text"]');

})();
*/

class stepFunctions {

  async openBrowser() {
    try {
      this.browser = await puppeteer.launch({ headless: false, slowMo: 30, args: ['--start-maximized', '--window-size=1920,1080'] });
      this.page = await this.browser.newPage();
      await this.page.goto(myurl, { waitUntil: 'networkidle2' });
    } catch (e) {
      console.error("Page not found");
    }
  }
  //Get page tile validated
  async getTitlePage() {
    const pageTitle = await this.page.title();
    console.log('\t HomePage Title =', pageTitle);
    assert.strictEqual(pageTitle, "Home loan borrowing power calculator | ANZ");
    console.log('\t Home Page title validation successful \t \n \t Browser is open \t');
  }

  // Filling Your details column
  async enterDetails(dataTable) {
    try {
      // Fill Application type 

      if (dataTable.rows()[0][0] == "Single") xpath = '[for="application_type_single"]';
      else if (dataTable.rows()[0][0] == "Joint") xpath = '[for="application_type_joint"]';
      await this.page.waitForSelector(xpath);
      await this.page.click(xpath);

      // Number of dependants-drop down
      await this.page.type('[title="Number of dependants"]', dataTable.rows()[0][1]);

      // Property you would like to buy -selection  

      if (dataTable.rows()[0][2] == "Home to live in") xpath = '[for="borrow_type_home"]';
      else if (dataTable.rows()[0][2] == "Residential investment") xpath = '[for="borrow_type_investment"]';
      await this.page.click(xpath);
    } catch (e) {
      console.error(e);
    }
  }

  // Filling Your earnings column
  async enterEarnings(dataTable) {
    try {
      // Fill Your income (before tax)    
      await this.page.type('[aria-labelledby="q2q1"]', dataTable.rows()[0][0]);
      // Fill Your other income
      await this.page.type('[aria-labelledby="q2q2"]', dataTable.rows()[0][1]);
    } catch (e) {
      console.error(e);
    }
  }

  // Filling Your expenses column
  async enterExpenses(dataTable) {
    try {
      // Living expenses
      await this.page.type('[aria-labelledby="q3q1"]', dataTable.rows()[0][0]);
      // Current home loan repayments
      await this.page.type('[aria-labelledby="q3q2"]', dataTable.rows()[0][1]);
      // Other loan repayments
      await this.page.type('[aria-labelledby="q3q3"]', dataTable.rows()[0][2]);
      // Other commitments
      await this.page.type('[aria-labelledby="q3q4"]', dataTable.rows()[0][3]);
      // Total credit card limits
      await this.page.type('[aria-labelledby="q3q5"]', dataTable.rows()[0][4]);
    } catch (e) {
      console.error(e);
    }
  }

  // Click on button (functionality for 'Work out how much I could borrow' or 'Start over')
  async clickOnButton(string) {
    if (string == "Work out how much I could borrow") xpath = '[id="btnBorrowCalculater"]';
    else if (string == "Start over") xpath = '[aria-label="Start over"]';
    // click
    await this.page.click(xpath);
  }

  // Capturing estimate result
  async validateEstimate(string) {
    //Filter xpath
    await this.page.waitForSelector('[aria-live="assertive"]');
    xpath = '[id="borrowResultTextAmount"]';
    const actualValue = await this.page.$eval(xpath, el => el.innerText);
    console.log("\t Estimated amount: \t" + actualValue);
    assert.strictEqual(string, actualValue);

  }
  // Validate 'Your Earnings' column
  async validateEarnings(dataTable) {
    try {
      // Your income (before tax)

      //your_income
      actualValue = getValueLocator(await (this.page.$eval('[aria-labelledby="q2q1"]', el => el.outerHTML)));
      assert.strictEqual(dataTable.rows()[0][0], actualValue);

      // Your other income
      actualValue = getValueLocator(await (this.page.$eval('[aria-labelledby="q2q2"]', el => el.outerHTML)));
      assert.strictEqual(dataTable.rows()[0][1], actualValue);
    } catch (e) {
      console.error(e);
    }
  }
  // Validate 'Your Expenses' column
  async validateExpenses(dataTable) {
    try {

      // Living expenses     

      actualValue = getValueLocator(await (this.page.$eval('[aria-labelledby="q3q1"]', el => el.outerHTML)));
      assert.strictEqual(dataTable.rows()[0][0], actualValue);

      // Current home loan repayments
      actualValue = getValueLocator(await (this.page.$eval('[aria-labelledby="q3q2"]', el => el.outerHTML)));
      assert.strictEqual(dataTable.rows()[0][1], actualValue);

      // Other loan repayments
      actualValue = getValueLocator(await (this.page.$eval('[aria-labelledby="q3q3"]', el => el.outerHTML)));
      assert.strictEqual(dataTable.rows()[0][2], actualValue);

      // Other commitments
      actualValue = getValueLocator(await (this.page.$eval('[aria-labelledby="q3q4"]', el => el.outerHTML)));
      assert.strictEqual(dataTable.rows()[0][3], actualValue);

      // Total credit card limits
      actualValue = getValueLocator(await (this.page.$eval('[aria-labelledby="q3q5"]', el => el.outerHTML)));
      assert.strictEqual(dataTable.rows()[0][4], actualValue);
    } catch (e) {
      console.error(e);
    }
  }

  async closeBrowser() {
    //closing the browser
    await this.browser.close();
  }
}
// Function to extract value
function getValueLocator(Value) {
  return Value.slice(Value.lastIndexOf("value=") + 7, Value.lastIndexOf("value=") + 8);
}
setWorldConstructor(stepFunctions);