// Captures sharp (2x) screenshots of the 14 project sites into ./projects/<slug>.jpg.
// The Decode404 page already looks for exactly these files and falls back to a clean browser-frame card if one is missing.
// Run once, from the website root folder:
//   npm i -D playwright && npx playwright install chromium && node tools/capture-screenshots.mjs
import { chromium } from 'playwright';
import fs from 'fs';

const URLS = [
  'https://end-to-end-medical-rag-chatbot.onrender.com/',
  'https://www.ikrameditrip.in/', 'https://www.eventsaaga.com/', 'https://www.yatratravelindia.com/',
  'https://dippakguptabyn3d.com/', 'https://listerled.com/', 'https://amoghyatra.com/', 'https://medoplus.in/',
  'https://www.rivakenkopharma.com/', 'https://www.tabloz.in/', 'https://balajidivyadham.com/',
  'https://socialmusk.com/', 'https://quicksort.co.in/', 'https://www.one2onehrsolution.com/', 'https://www.canvasidea.in/',
];

fs.mkdirSync('projects', { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

for (const url of URLS) {
  const slug = new URL(url).hostname.replace(/^www\./, '').replace(/[^a-z0-9]/g, '-');
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1500); // let hero animations and fonts settle
    await page.screenshot({ path: `projects/${slug}.jpg`, type: 'jpeg', quality: 90 });
    console.log('ok  ', slug);
  } catch (e) {
    console.log('FAIL', slug, e.message);
  }
  await page.close();
}
await browser.close();
