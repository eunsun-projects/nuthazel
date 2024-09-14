// useful-functions.js
// 페이지네이션 할 때, 특정 숫자까지의 배열을 만들고 limit 기준으로 자른 배열 만들기
export const sliceArrayByLimit = (totalPage: number, limit: number) => {
  const totalPageArray = Array(totalPage)
    .fill(0)
    .map((_, i) => i);

  const spliced = Array(Math.ceil(totalPage / limit))
    .fill([])
    .map(() => totalPageArray.splice(0, limit));
  const reduced = Array(spliced.length)
    .fill(0)
    .map((_, i) => i + 1);
  const temp = Array(spliced.length)
    .fill(0)
    .map((_, i) => i + 1);

  const final = Array(Math.ceil(reduced.length / limit))
    .fill([])
    .map(() => temp.splice(0, limit));

  return { reduced, spliced, final };
};
