const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.goto('https://www.fitnessai.com/exercise/overhead-crunch-machine');
  
    await page.waitForSelector('source').then( async () => {
      let src = await page.$eval("source", n => n.getAttribute("src"));
      const last = await page.$('video');
      const prev = await page.evaluateHandle(el => el.previousElementSibling, last);
      console.log(`uri: '${src}'`, '\n', `previuos item = ${prev}`);
    })
  
    
    
  
    await browser.close();
  })();