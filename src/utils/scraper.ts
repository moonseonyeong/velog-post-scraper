import { Page } from 'puppeteer';

export const clickFirstPost = async (page: Page) => {
  const firstPostTitleSelector = `#root > div:nth-child(2) > div:nth-child(3) > div:nth-child(4) > div:nth-child(3) > div > div:nth-child(1) > a:nth-child(2) > h2`;

  await page.waitForSelector(firstPostTitleSelector);
  await page.click(firstPostTitleSelector);
};

export const getTags = async (page: Page) => {
  const tags = await page.evaluate(() => {
    const postTagATags = Array.from(document.getElementsByTagName('a'));
    const tags = postTagATags
      .filter((tag) => tag.href.includes('tags'))
      .map((tag) => tag.textContent);

    return tags;
  });

  return tags;
};

export const getTitle = async (page: Page) => {
  await page.waitForSelector('div.head-wrapper');

  const title = await page.evaluate(() => {
    const title = document.getElementsByTagName('h1')[0]?.textContent;

    return title;
  });

  return title;
};

export const getContent = async (page: Page) => {
  await page.waitForSelector('div.atom-one');
  const content = await page.evaluate(() => {
    const contentClassName = `atom-one`;
    const content = document
      .getElementsByClassName(contentClassName)[0]
      ?.innerHTML.replaceAll('\n', '');

    return content;
  });

  return content;
};

export const getCreatedAt = async (page: Page) => {
  await page.waitForSelector('div.information');
  const createdAt = await page.evaluate(() => {
    const createdAtElement = document.getElementsByClassName(`information`)[0];
    const createdAt = createdAtElement?.lastChild?.textContent;

    return createdAt;
  });

  return createdAt;
};

export const getPost = async (page: Page) => {
  return {
    title: await getTitle(page),
    content: await getContent(page),
    createdAt: await getCreatedAt(page),
    tags: await getTags(page),
  };
};

export const getPrevPost = async (page: Page) => {
  await page.waitForSelector('#root>div:nth-child(2)>div:nth-child(7)');

  try {
    const prevPost = await page.evaluate(() => {
      const bodyDivList = document.querySelector('#root>div:nth-child(2)').children;
      const divArray = Array.from(bodyDivList) as HTMLDivElement[];

      const prevPostDiv = divArray.filter((el) => {
        return el.innerText.includes('이전 포스트');
      });

      if (prevPostDiv.length === 0) {
        return null;
      }

      const prevPostChildren = Array.from(prevPostDiv[0].children).filter((el: HTMLDivElement) =>
        el.innerText.includes('이전 포스트')
      )[0].children;

      const prevPostATag = Array.from(prevPostChildren)[0] as HTMLAnchorElement;

      return prevPostATag.href;
    });

    return prevPost;
  } catch (err) {
    console.log(err);
  }
};
