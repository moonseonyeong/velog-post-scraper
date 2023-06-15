import puppeteer from 'puppeteer';

export const launchBrowser = async (headless: boolean) => {
  const browser = await puppeteer.launch({
    headless: headless,
    protocolTimeout: 60000,
  });

  return browser;
};

export const goToPage = async (headless: boolean, url: string) => {
  const browser = await launchBrowser(headless);

  const page = await browser.newPage();
  page.setViewport({ width: 1400, height: 1000 });
  await page.goto(url, { waitUntil: 'networkidle2' });

  return { page, browser };
};
