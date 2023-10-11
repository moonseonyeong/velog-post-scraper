import { scrapeVelogPosts } from './scraper/scrapeVelogPosts';
import { getTotalPostCount } from './scraper/getTotalPostCount';
import { downloadVelogPosts } from './scraper/downloadVelogPosts';
import { consoleUtils } from './utils/console';

const add = (a: number, b: number) => {
  return a + b;
};

export { scrapeVelogPosts, getTotalPostCount, downloadVelogPosts, consoleUtils, add };
