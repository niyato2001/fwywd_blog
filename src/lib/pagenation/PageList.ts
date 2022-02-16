export default function PageList(page) {
  const pageNumber: number = Math.floor(page.length / 6);
  const pageList: string[] = [];
  if (page.length % 6 === 0) {
    [...Array(pageNumber)].map((_, i) => {
      pageList.push(String(i + 1));
    });
  } else {
    [...Array(pageNumber + 1)].map((_, i) => {
      pageList.push(String(i + 1));
      //i+1はindexが0スタートのため。i+1とすれば1スタートになるので。
    });
  }
  return pageList;
}
