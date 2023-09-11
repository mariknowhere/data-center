/**
 * return string with symbol (default '...') at the end
 * @param {string} string  String for which the symbol or '...' will be added at the end
 * @param {number} limit   Line limit after which there will be a symbol (default '...')
 * @param {string} symbol  Symbol to be after the line limit (default '...')
 * @return {string}        Modified string with a symbol (default '...') at the end
 */
export const limitString = (string: string, limit: number, symbol?: string): string => {
  symbol = symbol || '...';

  if (string.length < limit) {
    return string;
  }

  return string.substr(0, limit - symbol.length) + symbol;
};
