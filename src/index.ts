import { getTotalPostCount, scrapeVelogPosts, downloadVelogPosts } from './scraper/index';

//TODO : URL 입력 값으로 변경
const URL = 'https://velog.io/@sssssssssy';

scrapeVelogPosts(URL);

export { getTotalPostCount, scrapeVelogPosts, downloadVelogPosts };
