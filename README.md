# velog-post-scraper

Velog에서 전체 게시물 가져오기

## Getting Started

#### Installation

```
npm i velog-post-scraper
# or using yarn
yarn add velog-post-scraper
```

### Usage

```ts
const posts = scrapeVelogPosts(`VELOG_USER_ID`);
// result : [...,]
// {
//   title : `title`,
//   content : 'content',
//   createdAt : 'createdAt',
//   tags : ['tags'],
// }

downloadVelogPosts(posts); // posts json File download

const totalPostCount = getTotalPostCount('VELOG_USER_ID');
// velog post total count
```
