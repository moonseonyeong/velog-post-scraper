import { goToPage } from '../utils/browser';
import { clickFirstPost, getPost, getPrevPost } from '../utils/scraper';
import { Post } from '../types';

export const scrapeVelogPosts = async (userId: string) => {
  const url: string = `https://velog.io/@${userId}`;

  const { page } = await goToPage(false, url);
  const posts: Post[] = [];
  let successCount = 0;

  await clickFirstPost(page);

  try {
    const firstPost = await getPost(page);

    if (firstPost) {
      successCount++;
      posts.push(firstPost);
    } else {
      alert('게시글이 존재하지 않습니다.');
    }
  } catch (err) {
    throw err;
  }

  let hasPrevPost = await getPrevPost(page);

  while (hasPrevPost) {
    await page.goto(hasPrevPost);
    hasPrevPost = await getPrevPost(page);
    const post = await getPost(page);
    posts.push(post);

    console.log('이전 포스트가 존재합니다.', `카운트 증가 : ${successCount} , ${post.title}`); // TODO : console.log 제거
    successCount++;
  }

  return { posts, successCount };
};
