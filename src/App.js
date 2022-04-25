import React, { useEffect, useState } from "react";
import "./App.scss";
import { data as dummyData } from "./assets/dummy";

import ExpenseForm from "./components/Forms/ExpenseForm";
import Table from "./components/Table";
import Modal from "./components/Modal";

import LineChartComponent from "./components/Charts/LineChartComponent";
import DonutChartComponent from "./components/Charts/DonutChartComponent";
import BarChartComponent from "./components/Charts/BarChartComponent";
import {
  calculateCategoryData,
  calculateMonthlyData,
  calculateLast7DaysData,
} from "./utils/GraphDataCalculations";
import DeleteExpenseForm from "./components/Forms/DeleteExpenseForm";

function App() {
  const [data, setData] = useState(dummyData);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({});

  const [lineChartLabels, setLineChartLabels] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

  const [donutChartLabel, setDonutChartLabel] = useState([]);
  const [donutChartData, setDonutChartData] = useState([]);

  const [barChartLabel, setBarChartLabel] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    // Calculate Line Data
    const { lineNameArray, lineDataArray } = calculateMonthlyData(data);
    setLineChartLabels(lineNameArray);
    setLineChartData(lineDataArray);

    // Calculate Expense Category Data
    const { donutNameArray, donutDataArray } = calculateCategoryData(data);
    setDonutChartLabel(donutNameArray);
    setDonutChartData(donutDataArray);

    // Calcuate Last 7 days data;
    const { barChartLabel, barChartData } = calculateLast7DaysData(data);
    setBarChartLabel(barChartLabel);
    setBarChartData(barChartData);
  }, [data]);

  const showDeleteOperation = (expense) => {
    setDeleteModalData(expense);
    setIsOpenModal(true);
  };

  const handleDelete = () => {
    const newData = data.filter((expense) => expense.id !== deleteModalData.id);
    setData(newData);
    setIsOpenModal(false);
  };

  return (
    <div className="App">
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <DeleteExpenseForm data={deleteModalData} handleDelete={handleDelete} />
      </Modal>
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
            <ExpenseForm data={data} setData={setData} />
          </div>

          <div className="grid-item grid-item-4">
            <h4>Daily Expenses</h4>
            <BarChartComponent
              barChartLabel={barChartLabel}
              barChartData={barChartData}
            />
          </div>
          <div className="grid-item grid-item-5">
            <h4>Expense Table</h4>
            <Table TD={data} showDeleteOperation={showDeleteOperation} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
