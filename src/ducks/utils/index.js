export const idInObjectValue = (data) => {
  const dataArray = Object.entries(data);
  return  dataArray.reduce((acc, curr) => ({ ...acc, [curr[0]]: {...curr[1], id: curr[0]}}), {});
};

export const addUniqItemToArray = (arr, item) => {
  const itemIndex = arr.indexOf(item);
  if (itemIndex === -1) return [...arr, item];
  arr.splice(itemIndex, 1);
  return [...arr];
};