const puppeteer = require('puppeteer');
const fs = require('fs');
const titles = [];
const exercises = [];


async function getExercise(url) {
    const browser = await puppeteer.launch();


    const page = await browser.newPage();
    await page.goto(url, { timeout: 0 });
    const exTitle = await page.$eval(".exercise-fade-in.wf-section>h1.heading-20", e => e.innerText)

    const exVideoURL = await page.$eval(".html-embed-3.w-embed>video>source", e => e.getAttribute("src"))
    const proTip = await page.$eval(".exercise-fade-in.wf-section>.rich-text-block-3.pro-tip.w-richtext>p", e => e.innerText)
    const howToList = await page.$$eval(
        ".exercise-fade-in.wf-section>.rich-text-block-3.instructions-ex.w-richtext>ol>li",
        items => items.map(item => `${item.textContent}`
        ));
    const primaryMuscleGroups = await page.$$eval(
        // select all instances of <div> in the list
        "body > div.container-5.w-container > div:nth-child(4) > div.w-dyn-list > div > div",
        items => {
            const data = items.map(el => {
                const name = el.children[2].innerText;
                const description = el.children[3].innerText;
                const imageURL = el.querySelector('.w-embed>img').getAttribute("src")
                const muscle = {
                    name: name,
                    description: description,
                    imageURL: imageURL
                }
                return muscle
            })
            return data
        }
    );

    const secondaryMuscleGroups = await page.$$eval(
        // select all instances of <div> in the list
        "body > div.container-5.w-container > div:nth-child(5) > div.w-dyn-list > div > div",
        items => {
            const data = items.map(el => {
                const name = el.children[2].innerText;
                const description = el.children[3].innerText;
                const imageURL = el.querySelector('.html-embed-4.w-embed>img').getAttribute("src")
                const muscle = {
                    name: name,
                    description: description,
                    imageURL: imageURL
                }
                return muscle
            });
            return data
        }
    );

    const equipments = await page.$$eval(
        "body > div.container-5.w-container > div:nth-child(6) > div.w-dyn-list > div > div",
        items => {
            const data = items.map(el => {
                const name = el.querySelector("p").innerText;
                const description = el.querySelector('.rich-text-block-6.w-richtext > p').innerText;
                const equipment = {
                    name: name,
                    description: description
                }
                return equipment
            });
            return data
        }
    );

    const variations = await page.$$eval(
        "body > div.container-5.w-container > div:nth-child(7) > div.w-dyn-list > div > div",
        items => {
            const data = items.map(el => {
                const title = el.querySelector('a>div.text-block-17').innerText;
                const baseURL = "https://www.fitnessai.com".concat(el.querySelector('a').getAttribute("href"))
                const thumImagURL = el.querySelector('a>img').getAttribute("src")
                const variation = {
                    title: title,
                    baseURL: baseURL,
                    thumImagURL: thumImagURL
                }
                return variation
            });
            return data
        }
    );


    const alternatives = await page.$$eval(
        "body > div.container-5.w-container > div:nth-child(8) > div.w-dyn-list > div > div",
        items => {
            const data = items.map(el => {
                const title = el.querySelector('a>div.text-block-17').innerText;
                const baseURL = "https://www.fitnessai.com".concat(el.querySelector('a').getAttribute("href"))
                const thumImagURL = el.querySelector('a>img').getAttribute("src")
                const alternative = {
                    title: title,
                    baseURL: baseURL,
                    thumImagURL: thumImagURL
                }
                return alternative
            }
            );
            return data
        });

    const exercise = {
        title: exTitle,
        videoURL: exVideoURL,
        proTip: proTip,
        howTo: howToList,
        primaryMuscleGroups: primaryMuscleGroups,
        secondaryMuscleGroups: secondaryMuscleGroups,
        equipments: equipments,
        variations: variations,
        alternatives: alternatives,
    }
    if (!titles.includes(exTitle)) {
        titles.push(exTitle);
        fs.appendFileSync('./data.json', JSON.stringify(exercise))
        fs.appendFileSync('./data.json', ',')
        console.log(exTitle);
    } else {
        console.log('======= Exercise is already recorded =========');
    }
    await browser.close();

}



const urls = [

    'https://www.fitnessai.com/exercise/wide-grip-barbell-bench-press',
    'https://www.fitnessai.com/exercise/wide-grip-barbell-bench-press',
    'https://www.fitnessai.com/exercise/close-grip-barbell-bench-press',
    'https://www.fitnessai.com/exercise/bench-press',
    'https://www.fitnessai.com/exercise/cable-push-down',
    'https://www.fitnessai.com/exercise/incline-dumbbell-press',
    'https://www.fitnessai.com/exercise/incline-chest-press-machine',
    'https://www.fitnessai.com/exercise/band-chest-press',
    'https://www.fitnessai.com/exercise/incline-dumbbell-fly',
    'https://www.fitnessai.com/exercise/incline-dumbbell-fly',

]

urls.forEach(el => getExercise(el))




