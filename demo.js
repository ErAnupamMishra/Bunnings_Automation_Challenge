const puppeteer = require('puppeteer');
const assert = require('assert');
const { Before, After, setWorldConstructor } = require('cucumber');

const myurl = "https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/";
//Few variables
var xpath = '';
var data ='Single';
/*var getValueLocator='';

//var getValueLocator=  Value.slice(Value.lastIndexOf("value=")+7,Value.lastIndexOf("value=")+8);  
if (data =='Single'){
    xpath = '[for="application_type_single"]';
     //this.page.waitForSelector(xpath);
       //this.page.click(xpath);
       console.log("xpath", xpath);
}

//const application_type_single = page.$x('//input[@id="application_type_single"]'); //Application type for single
console.log("anupam ");*/
/*function getValueLocator(Value) {  
    return Value.slice(Value.lastIndexOf("value=")+7,Value.lastIndexOf("value=")+8);  
  }*/

  (async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://news.ycombinator.com/news')
    const name = await page.$eval('.hnname > a', el => el.innerText)
    console.log(name)
    await browser.close()
   })();