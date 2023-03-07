const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.fitnessai.com/exercise/lat-pulldown-machine');

  const exVideoURL = await page.$eval(".html-embed-3.w-embed>video>source", e => e.getAttribute("src"))
  const exTitle = await page.$eval(".exercise-fade-in.wf-section>h1.heading-20", e => e.innerText)
  const proTip = await page.$eval(".exercise-fade-in.wf-section>.rich-text-block-3.pro-tip.w-richtext>p", e => e.innerText)
  const howToList = await page.$$eval(
    ".exercise-fade-in.wf-section>.rich-text-block-3.instructions-ex.w-richtext>ol>li",
    items => items.map(item => item.textContent
    ));
  const primaryMuscleGroups = await page.$$eval(
    ".exercise-fade-in.wf-section>.w-dyn-list>.collection-list-2.w-dyn-items.w-row",
    items => {
      const arr = [].slice.call(items[0].children)
      return arr
    }

  )



  console.log(primaryMuscleGroups);
  await browser.close();
})();