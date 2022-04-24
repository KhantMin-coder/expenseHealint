import React, { useEffect, useState } from "react";
import "./App.scss";
import LineChartComponent from "./components/LineChartComponent";
import { data as dummyData } from "./assets/dummy";
import moment from "moment";
import DonutChartComponent from "./components/DonutChartComponent";
import BarChartComponent from "./components/BarChartComponent";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  const [data, setData] = useState(dummyData);

  const [lineChartLabels, setLineChartLabels] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

  const [donutChartLabel, setDonutChartLabel] = useState([]);
  const [donutChartData, setDonutChartData] = useState([]);

  const [barChartLabel, setBarChartLabel] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

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

  useEffect(() => {
    // Calculate Line Data
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

    setLineChartLabels(lineNameArray);
    setLineChartData(lineDataArray);

    // Calculate Expense Category Data
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

    let donutNameArray = categroryData.map((item) => item.name);
    let donutDataArray = categroryData.map((item) => item.total);
    setDonutChartLabel(donutNameArray);
    setDonutChartData(donutDataArray);

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

    let barChartLabel = lastWeekGroups.map((item) => item.date);
    let barChartData = lastWeekGroups.map((item) => item.total);
    setBarChartLabel(barChartLabel);
    setBarChartData(barChartData);
  }, []);

  const getLastWeek = () => {
    let lastWeek = [];
    for (let i = 0; i < 7; i++) {
      let date = moment().subtract(i, "days");
      lastWeek.push(date.format("DD/MM/YYYY"));
    }
    return lastWeek;
  };

  return (
    <div className="App">
      <div className="container">
        <div className="grid">
          <div className="grid-item grid-item-1">
            <h3>Monthly Data</h3>
            <LineChartComponent
              lineChartLabels={lineChartLabels}
              lineChartData={lineChartData}
            />
          </div>

          <div className="grid-item grid-item-2">
            <h3>Expense Category</h3>
            <DonutChartComponent
              donutChartLabel={donutChartLabel}
              donutChartData={donutChartData}
            />
          </div>

          <div className="grid-item grid-item-3">
            <h3>Add New Expenses</h3>
            <ExpenseForm />
          </div>

          <div className="grid-item grid-item-4">
            <h4>Daily Expenses</h4>
            <BarChartComponent
              barChartLabel={barChartLabel}
              barChartData={barChartData}
            />
          </div>

          <div className="grid-item grid-item-5">
            <p>Table </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
