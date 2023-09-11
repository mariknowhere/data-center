/**
 * return filters for request
 * @param {string} filters      Filters to check
 * @param {any} firstValue      First filter
 * @param {any} secondaryValue  Second filter
 * @param {string} key          Key for filter check
 * @return {string}             Filters for request
 */
export const filterDateOrNumber = (filters: string, firstValue: any, secondaryValue: any, key: string) => {
  if (secondaryValue && firstValue[key] && secondaryValue !== firstValue[key]) {
    filters += `${filters ? '&' : ''}${key}=${secondaryValue}`;
  } else if (firstValue[key] && !secondaryValue) {
    filters += `${filters ? '&' : ''}${key}=more`;
  } else if (!firstValue[key] && secondaryValue) {
    filters += `${filters ? '&' : ''}${key}=${secondaryValue}`;
    filters += `${filters ? '&' : ''}${key}=less`;
  }

  return filters;
};
