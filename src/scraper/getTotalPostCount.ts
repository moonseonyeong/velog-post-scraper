import { goToPage } from '../utils/browser';

export const getTotalPostCount = async (userId: string) => {
  const url: string = `https://velog.io/@${userId}`;
  const { page } = await goToPage(false, url);

  const postCountText = await page.evaluate(() => {
    const postTagList = document.querySelectorAll('ul')[0].children;
    const postTagListArr = Array.from(postTagList);
    const countTag = postTagListArr.filter((li: HTMLLIElement) =>
      li.outerText.includes('전체')
    ) as HTMLLIElement[];

    if (countTag.length === 0) {
      return '게시글이 존재하지 않습니다.';
    }

    return countTag[0].innerText;
  });

  const count = extractNumberFromText(postCountText);

  return count;
};

const extractNumberFromText = (text: string) => {
  // 정규식 패턴: 괄호 안에 있는 숫자를 추출
  const regex = /\((\d+)\)/;
  const match = text.match(regex);

  if (match && match[1]) {
    const numberValue = parseInt(match[1]);
    return numberValue;
  }

  return 0;
};
