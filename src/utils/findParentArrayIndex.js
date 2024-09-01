export default function findParentArrayIndex(array, targetNum) {
    return array.findIndex(childArray =>
        childArray.some(element => element.num === targetNum)
    );
}