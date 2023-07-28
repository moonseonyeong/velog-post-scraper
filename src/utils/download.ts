import { Post } from 'types';
const fs = require('fs');

export const downloadJsonFile = async (fileNm: string, contents: Post) => {
  let filePath = fileNm + '.json';

  const jsonContents = `{
    "title": "${contents.title}",
    "content": "${contents.content}",
    "createdAt": "${contents.createdAt}",
    "tags": ${JSON.stringify(contents.tags, null, 2)}
  }`;

  fs.writeFileSync(filePath, jsonContents);

  console.log('File downloaded:', filePath);
};
