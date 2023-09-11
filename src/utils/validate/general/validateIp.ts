/**
 * return is the data valid
 * @param {string} ip  Validation data
 * @return {boolean}   Is the data valid
 */
export const validateIp = (ip: string): boolean => {
  if (!ip) return false;

  const ipArray = ip.trim().split('.');

  if (ipArray.length !== 4) {
    return false;
  }

  const ipIncorrectItem = ipArray.find(ip => parseInt(ip) > 255 || parseInt(ip) < 0 || isNaN(parseInt(ip)));
  const isIpArrayIncorrect = !!ipIncorrectItem;

  return !isIpArrayIncorrect;
};
