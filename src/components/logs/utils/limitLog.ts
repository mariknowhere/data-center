/**
 * return prepare for panel description log
 * @param {string} log  Description log for short/long
 * @return {string}     Prepare for panel description log
 */
export const limitLog = (log: string): string => {
  if (!log) {
    return log;
  }

  const prepareLog = log.split('.');

  if (prepareLog.length === 0 || prepareLog[1] === ' ') {
    return log;
  }

  return prepareLog[0] + '...';
};
