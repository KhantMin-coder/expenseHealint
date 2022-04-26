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
import EditExpenseForm from "./components/Forms/EditExpenseForm";
import { useLocalStorage } from "./hooks/UseLocalStorage";

function App() {
  const [data, setData] = useLocalStorage("expenses", dummyData);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});

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
    setSelectedData(expense);
    setIsOpenDeleteModal(true);
  };

  const showEditOperation = (expense) => {
    setSelectedData(expense);
    setIsOpenEditModal(true);
  };

  const handleDelete = () => {
    const newData = data.filter((expense) => expense.id !== selectedData.id);
    setData(newData);
    setIsOpenDeleteModal(false);
  };

  const handleEdit = (passedData) => {
    const newData = data.map((expense) => {
      if (expense.id === passedData.id) {
        return passedData;
      }
      return expense;
    });
    setData(newData);
    setIsOpenEditModal(false);
  };

  return (
    <div className="App">
      <Modal isOpen={isOpenDeleteModal} setIsOpen={setIsOpenDeleteModal}>
        <DeleteExpenseForm data={selectedData} handleDelete={handleDelete} />
      </Modal>
      <Modal isOpen={isOpenEditModal} setIsOpen={setIsOpenEditModal}>
        <EditExpenseForm data={selectedData} handleEdit={handleEdit} />
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
            <Table
              TD={data}
              showDeleteOperation={showDeleteOperation}
              showEditOperation={showEditOperation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
