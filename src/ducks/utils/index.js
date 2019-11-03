export const normolizeEventsInPerson = (data) => {
  if (data.events) {
    return { ...data, events: Object.keys(data.events)}
  }
  return data
};

export const idInObjectValue = (data) => {
  const dataArray = Object.entries(data);
  return  dataArray.reduce((acc, curr) => ({ ...acc, [curr[0]]: {...normolizeEventsInPerson(curr[1]), id: curr[0]}}), {});
};

export const addUniqItemToArray = (arr, item) => {
  const itemIndex = arr.indexOf(item);
  if (itemIndex === -1) return [...arr, item];
  arr.splice(itemIndex, 1);
  return [...arr];
};

export const deleteItem = (obj, item) => {
  delete obj[item];
  return {...obj}
};
