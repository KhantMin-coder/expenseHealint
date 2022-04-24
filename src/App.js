import "./App.scss";
import LineChartComponent from "./components/LineChartComponent";
import { data } from "./assets/dummy";
import DonutChartComponent from "./components/DonutChartComponent";
import BarChartComponent from "./components/BarChartComponent";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="grid">
          <div className="grid-item grid-item-1">
            <h3>Monthly Data</h3>
            <LineChartComponent data={data} />
          </div>
          <div className="grid-item grid-item-2">
            <h3>Expense Category</h3>
            <DonutChartComponent data={data} />
          </div>
          <div className="grid-item grid-item-3">
            <h3>Add New Expenses</h3>

          </div>
          <div className="grid-item grid-item-4">
            <h4>Daily Expenses</h4>
            <BarChartComponent data={data}/>
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
