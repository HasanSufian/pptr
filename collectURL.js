const puppeteer = require('puppeteer');
const fs = require('fs');
let all = [];

async function getURL(url) {

    process.setMaxListeners(0)

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { timeout: 0 });

    const variations = await page.$$eval(
        "body > div.container-5.w-container > div:nth-child(7) > div.w-dyn-list > div > div",
        items => {
            const data = items.map(el => {
                const baseURL = "https://www.fitnessai.com".concat(el.querySelector('a').getAttribute("href"))
                return baseURL
            });
            return data
        }
    );


    const alternatives = await page.$$eval(
        "body > div.container-5.w-container > div:nth-child(8) > div.w-dyn-list > div > div",
        items => {
            const data = items.map(el => {
                const baseURL = "https://www.fitnessai.com".concat(el.querySelector('a').getAttribute("href"))
                return baseURL
            }
            );
            return data
        });
    all = (alternatives.concat(variations))
    console.log(all);
    // fs.appendFileSync('./urls.json', JSON.stringify(all))
    // fs.appendFileSync('./urls.json', ',')
    await browser.close();
};



const urls = [
    'https://www.fitnessai.com/exercise/wide-grip-barbell-bench-press',
    'https://www.fitnessai.com/exercise/incline-bench',
    'https://www.fitnessai.com/exercise/close-grip-barbell-bench-press',
    'https://www.fitnessai.com/exercise/bench-press'
]

urls.forEach(el => getURL(el))
// do this for exercise object insted of urls

