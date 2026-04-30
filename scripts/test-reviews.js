const { chromium } = require('playwright-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
chromium.use(StealthPlugin());

async function testExtraction(asin) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const url = `https://www.amazon.com/dp/${asin}?language=es_US`;
  console.log(`Abriendo ${url}...`);
  
  await page.goto(url, { waitUntil: 'networkidle' });
  
  // Scroll to bottom to ensure reviews are loaded
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      let distance = 100;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if(totalHeight >= scrollHeight){
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });

  const reviews = await page.evaluate(() => {
    const items = [...document.querySelectorAll('[data-hook="review"]')];
    return items.map(el => ({
      rating: el.querySelector('[data-hook="review-star-rating"] .a-icon-alt, [data-hook="cmps-review-star-rating"] .a-icon-alt')?.textContent,
      title: el.querySelector('[data-hook="review-title"]')?.textContent?.trim(),
      body: el.querySelector('[data-hook="review-body"]')?.textContent?.trim(),
      exists_body_span: !!el.querySelector('[data-hook="review-body"] span')
    }));
  });

  console.log('Resultados:', JSON.stringify(reviews, null, 2));
  await browser.close();
}

testExtraction('B0BJMV9BXJ');
