export const excerptFirst = (str = "") => {
  if (str.length != null) {
    const index = str.indexOf(".") + 1;
    return str.substring(0, index);
  }
  return str;
};
export const excerptSecond = (str = "") => {
  if (str.length != null) {
    const index = str.indexOf(".") + 1;
    return str.substring(index, str.length);
  }
  return str;
};

export const elipsis = (str = "", trim = 30) => {
  if (str.length != null) {
    return `${str.substring(0, trim)}...`;
  }
  return str;
};
