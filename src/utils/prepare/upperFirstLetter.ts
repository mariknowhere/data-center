/**
 * return word with first capital letter
 * @param {string} word  Word for upper case first letter
 * @return {string}      Word with first capital letter
 */
export const upperFirstLetter = (word: string): string => word[0].toUpperCase() + word.slice(1);
