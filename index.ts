import { scrapeVelogPosts } from './src/scraper';

//TODO : URL 입력 값으로 변경
// const URL = 'https://velog.io/@sssssssssy';
// const URL = 'https://velog.io/@1yoouoo'; // 게시글 1
const URL = 'https://velog.io/@typo'; // 게시글 8

scrapeVelogPosts(URL);
