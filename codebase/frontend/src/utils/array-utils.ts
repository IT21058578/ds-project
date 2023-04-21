export const isNotPresent = (arr?: any[]): boolean => {
  if (arr !== undefined) {
    if (arr.length > 0) return false;
  }
  return true;
};
