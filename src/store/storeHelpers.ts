import {AnyAction} from '@reduxjs/toolkit';

/**
 * return checking for case type that it was rejected
 * @param {AnyAction} action  Actual action
 * @return {boolean}          Checking for case type that it was rejected
 */
const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export {
  isError,
};
