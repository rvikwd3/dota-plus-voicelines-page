export const uniqueStrings = (strings: string[]) => {
  const uniqueStrings = new Set(strings);
  return Array.from(uniqueStrings);
};
