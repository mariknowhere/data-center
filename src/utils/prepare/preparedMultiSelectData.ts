/**
 * return prepare selected items in string to ru
 * @param {string[]} selectedItems                   Selected items for translated in russian language
 * @param {{ [index: string]: string }} prepareToRu  Object with russian values for translated
 * @return {string}                                  Prepare selected items in string to ru
 */
export const preparedMultiSelectData = (
  selectedItems: string[],
  prepareToRu: { [index: string]: string },
): string => {
  const prepareSelectedItems =
    selectedItems.map(negativeConsequence => prepareToRu[negativeConsequence]);

  return prepareSelectedItems.join(', ');
};
