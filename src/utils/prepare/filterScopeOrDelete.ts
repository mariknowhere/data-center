import {Dispatch, SetStateAction} from 'react';

/**
 *
 * @param {any} dispatch                                    Dispatcher to change values in the store
 * @param {string} filterText                               Filter for filter without my_scope and is_delete
 * @param {Dispatch<SetStateAction<string>>} setFilterText  Setter for changes filterText
 */
export const filterScopeOrDelete = (dispatch: any, filterText: string, setFilterText: Dispatch<SetStateAction<string>>) => {
  if (filterText.includes('my_scope') || filterText.includes('is_delete')) {
    const filterArray = filterText.split('&');
    const filterWithoutScopeAndDelete =
      filterArray
        .filter(filter => filter !== 'my_scope=true')
        .filter(filter => filter !== 'is_delete=true');

    const newFilterText = filterWithoutScopeAndDelete.join('&');

    dispatch(setFilterText(newFilterText));
  }
};
