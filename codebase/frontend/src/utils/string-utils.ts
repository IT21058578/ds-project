/**
 * Converts a camel case string into a normal phrase.
 * Ex: firstName -> First Name
 * @param {string} string - A camel case string
 * @returns {string} A normal phrase with each word capitalized
 */
export const camelToNormal = (string: string): string => {
  const temp = string.replace(/[A-Z]/g, " $&");
  return temp.charAt(0).toUpperCase() + temp.slice(1);
};

export const textEllipsis = (string: string, limit: number): string => {
  if (string.length > limit) {
    return string.substring(0, limit).concat("...");
  }
  return string;
};
