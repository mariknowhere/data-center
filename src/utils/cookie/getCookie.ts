/**
 * return property from cookies
 * @param {string} name          Key to search among properties in cookies
 * @return {string | undefined}  Property from cookies
 */
export const getCookie = (name: string) => {
  const matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)',
  ));

  return matches ? decodeURIComponent(matches[1]) : undefined;
};
