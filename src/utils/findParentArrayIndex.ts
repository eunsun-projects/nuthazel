export default function findParentArrayIndex(array: any[], targetNum: number) {
  return array.findIndex((childArray) =>
    childArray.some((element: any) => element.num === targetNum)
  );
}
