import moment from "moment";
const monthMap = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export const getTodaysDateInMonthDay = () => {
  let today = moment();
  let monthIndex = today.format("M");
  let day = today.format("D");
  return `${monthMap[monthIndex]} ${day}`;
};

export const getTodaysDate = () => {
  return moment().format("YYYY-MM-DD");
};
