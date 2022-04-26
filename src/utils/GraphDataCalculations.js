import moment from "moment";

const possibleMonthStrings = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Calculate Monthly Data Graph
export const calculateMonthlyData = (data) => {
  let monthGroup = data.reduce(function (r, o) {
    var m = o.date.split("/")[1];
    r[m] ? r[m].push(o) : (r[m] = []);
    return r;
  }, {});

  let tableData = [];
  for (const key in monthGroup) {
    tableData.push({
      key: key,
      name: possibleMonthStrings[Number(key) - 1],
      total: monthGroup[key].reduce(function (acc, obj) {
        return acc + obj.expense;
      }, 0),
    });
  }

  tableData = tableData.sort((a, b) => Number(a.key) - Number(b.key));
  let lineNameArray = [];
  let lineDataArray = [];
  for (let i = 0; i < tableData.length; i++) {
    lineNameArray.push(tableData[i].name);
    lineDataArray.push(tableData[i].total);
  }

  return { lineNameArray, lineDataArray };
};

// Calculate Category Data Graph
export const calculateCategoryData = (data) => {
  let categroies = data.reduce(function (r, o) {
    var cate = o.category;
    r[cate] ? r[cate].push(o) : (r[cate] = []);
    return r;
  }, {});

  let categroryData = [];
  for (const key in categroies) {
    categroryData.push({
      name: key,
      total: categroies[key].reduce(function (acc, obj) {
        return acc + obj.expense;
      }, 0),
    });
  }

  let donutNameArray = [];
  let donutDataArray = [];
  for (let i = 0; i < categroryData.length; i++) {
    donutNameArray.push(categroryData[i].name);
    donutDataArray.push(categroryData[i].total);
  }

  return { donutNameArray, donutDataArray };
};

const getLastWeek = () => {
  let lastWeek = [];
  for (let i = 0; i < 7; i++) {
    let date = moment().subtract(i, "days");
    lastWeek.push(date.format("DD/MM/YYYY"));
  }
  return lastWeek;
};

export const calculateLast7DaysData = (data) => {
  // Calcuate Last 7 days data;
  let lastWeek = getLastWeek();

  let lastWeekData = data.filter((e) => {
    return lastWeek.includes(e.date);
  });

  let lastWeekGroups = [];
  for (let i = 0; i < lastWeek.length; i++) {
    let wantedString =
      lastWeek[i].split("/")[0] + "/" + lastWeek[i].split("/")[1];
    lastWeekGroups.push({
      date: lastWeek[i],
      displayDate: wantedString,
      total: 0,
    });
  }

  lastWeekData.forEach((e, i) => {
    lastWeekGroups.forEach((e2, i2) => {
      if (e.date === e2.date) {
        lastWeekGroups[i2].total += e.expense;
      }
    });
  });

  let barChartLabel = [];
  let barChartData = [];
  for (let i = lastWeekGroups.length - 1; i > -1 ; i--) {
    barChartLabel.push(lastWeekGroups[i].displayDate);
    barChartData.push(lastWeekGroups[i].total);
  }

  console.log(barChartData, barChartLabel);
  return { barChartLabel, barChartData };
};
