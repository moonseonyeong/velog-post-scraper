import { downloadJsonFile } from './utils/download';
import { goToPage } from './utils/browser';
import { clickFirstPost, getPost, getPrevPost } from './utils/scraper';

export const scrapeVelogPosts = async (URL: string) => {
  const { page } = await goToPage(false, URL);
  const posts = [];
  let successCount = 0;

  await clickFirstPost(page);
  const firstPost = await getPost(page);
  posts.push(firstPost);

  let hasPrevPost = await getPrevPost(page);

  while (hasPrevPost && successCount < 10) {
    console.log('이전 포스트가 존재합니다.', `카운트 증가 : ${successCount}`);

    await page.goto(hasPrevPost);
    hasPrevPost = await getPrevPost(page);
    const post = await getPost(page);
    posts.push(post);

    successCount++;
  }

  posts.map((post, idx) => {
    console.log(idx, post);
    // await downloadJsonFile('post', post);
  });
};
