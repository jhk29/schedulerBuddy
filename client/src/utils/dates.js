import moment from "moment";
const monthMap = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export const getTodaysDateInMonthDay = () => {
  let today = new Date();
  let monthIndex = today.getMonth();
  let day = today.getDay();
  return `${monthMap[monthIndex]} ${day}`;
};

export const getTodaysDate = () => {
  return moment().format("YYYY-MM-DD");
};
