export const makeOptions = (array) => {
  return array?.map((item) => {
    return { label: item.name, value: item.id };
  });
};

export const makeLabelOptions = (array) => {
  return array?.map((item) => {
    return { label: item, value: item };
  });
};

export const truncateTitle = (title, maxLength) => {
  return title.length > maxLength
    ? `${title.substring(0, maxLength)}...`
    : title;
};
