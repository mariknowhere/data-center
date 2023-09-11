/**
 * return is the data valid
 * @param {string} id  Validation data
 * @return {boolean}   Is the data valid
 */
export const validateCveId = (id: string): boolean => {
  if (!id) return false;

  const idArray = id.trim().split('-');
  const idArrayFirst = idArray[0]?.split('');
  const idArrayThird = idArray[2]?.split('');

  if (idArray.length !== 3) {
    return false;
  }

  const firstItemArray =
    idArray[0].length === 3 && idArrayFirst[0] === 'C' && idArrayFirst[1] === 'V' && idArrayFirst[2] === 'E';
  const secondItemArray = idArray[1].length === 4 && !(isNaN(Number(idArray[1])));
  const thirdItemArray = idArray[2].length >= 4 && idArray[2].length <= 7 && !(isNaN(Number(idArray[2])));
  const thirdItemCorrect = parseInt(idArrayThird[3]) !== 0 && parseInt(idArrayThird[4]) !== 0 &&
    parseInt(idArrayThird[5]) !== 0 && parseInt(idArrayThird[6]) !== 0;

  return firstItemArray && secondItemArray && thirdItemArray && thirdItemCorrect;
};
