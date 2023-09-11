/**
 * return rounded number
 * @param {number} input  Number to round
 * @return {number}       Rounded number
 */
export const roundup = (input: number) => {
  const intInput = Math.round(input * 100000);

  if (intInput % 10000 === 0) {
    return intInput / 100000.0;
  } else {
    return (Math.floor(intInput / 10000) + 1) / 10.0;
  }
};
