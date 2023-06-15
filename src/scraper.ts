import { goToPage } from './utils/browser';
import { clickFirstPost, getPost } from './utils/scraper';

export const scrapeVelogPosts = async (URL: string) => {
  const { page } = await goToPage(false, URL);

  await clickFirstPost(page);
  const post = await getPost(page);

  console.log(post);
};
