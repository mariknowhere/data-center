/**
 * return prepare date in Data format
 * @param {string} date  Date in string format
 * @return {string}      Prepare date in Data format
 */
export const dateRefactor = (date: string) => {
  const prepareDate = new Date(date);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  // @ts-ignore
  return prepareDate.toLocaleDateString('ru', options);
};
