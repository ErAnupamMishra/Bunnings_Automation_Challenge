/** Scenarios/Step Function file for Bunnings Search functionality
#Author: anupam.mishra13@gmail.com
#Version : 1.0 
#Status :Published
#Summary : To be called by Step definitions files for all functions and scenarios in Automation Framework 
*/
const puppeteer = require('puppeteer');
const assert = require('assert');
const { Before, After, setWorldConstructor } = require('cucumber');

const myurl = "https://www.bunnings.com.au/";
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
    assert.strictEqual(pageTitle, "Bunnings Warehouse | Australia's DIY, Garden & Hardware Store");
    console.log('\t Home Page title validation successful \t \n \t Browser is open \t');
  }

  // FillingSearch details in search box
  async enterDetails(string) {
    try {
      // Putting Search item       
        await this.page.type('[data-page="/search"]', string);
        console.log("\t Input Value: \t" +string );       
      
    } catch (e) {
      console.error(e);
    }
  }
 // Capturing result
 async validateResult(string) {
  //Filter xpath
  await this.page.waitForSelector('[class="responsive-search-title__count"]');
  xpath = '[class="responsive-search-title__count"]';
  const actualValue = await this.page.$eval(xpath, el => el.innerText);
  console.log("\t Total Number of Records: \t" + actualValue);
  assert.strictEqual(string, actualValue);

}

  // Click on Search button
  async clickOnButton() {
    xpath = '[class="search-container_icon-search"]';    
    // click
    await this.page.click(xpath);    
  }
 
  async closeBrowser() {
    //closing the browser
    await this.browser.close();
  }
}

setWorldConstructor(stepFunctions);