import { downloadJsonFile } from './utils/download';
import { goToPage } from './utils/browser';
import { clickFirstPost, getPost, getPrevPost } from './utils/scraper';
import { Post } from 'types';

export const scrapeVelogPosts = async (URL: string) => {
  const { page } = await goToPage(false, URL);
  const posts: Post[] = [];
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

  console.log(`while탈출`, hasPrevPost);

  posts.map(async (post, idx) => {
    console.log(idx, post.title);
    await downloadJsonFile(`${post.createdAt}`, post);
  });
};
