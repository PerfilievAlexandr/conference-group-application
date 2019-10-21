export const idInObjectValue = (data) => {
  const dataArray = Object.entries(data);
  return  dataArray.reduce((acc, curr) => ({ ...acc, [curr[0]]: {...curr[1], id: curr[0]}}), {});
};