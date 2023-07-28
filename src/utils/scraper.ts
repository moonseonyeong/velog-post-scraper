import { Page } from 'puppeteer';
import { Post } from 'types';

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

  const createdAtText = await page.evaluate(() => {
    const createdAtElement = document.getElementsByClassName(`information`)[0];
    const createdAt = createdAtElement?.lastChild?.textContent;

    return createdAt;
  });

  if (createdAtText.includes('일 전')) {
    const daysAgo = Number(createdAtText.split('일 전')[0]);
    const previousDate = calculatePreviousDate(daysAgo);
    const formattedDate = formatDate(previousDate);

    return formattedDate;
  }

  return createdAtText;
};

const calculatePreviousDate = (daysAgo: number) => {
  const today = new Date();
  const previousDate = new Date(today);
  previousDate.setDate(today.getDate() - daysAgo);

  return previousDate;
};

const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

export const getPost = async (page: Page): Promise<Post> => {
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
