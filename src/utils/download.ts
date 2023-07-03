const fs = require('fs');

export const downloadJsonFile = async (fileNm: string, contents: any) => {
  let filePath = fileNm + '.json';
  fs.writeFileSync(filePath, JSON.stringify(contents));

  console.log('File downloaded:', filePath);
};
