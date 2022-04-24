import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartComponent = ({ data }) => {
  const [labelData, setLabelData] = React.useState([]);
  const [dataSet, setDataSet] = React.useState([]);

  useEffect(() => {
    let eg1 = ["jan", "feb", "mar", "apr"];
    let eg2 = [4000, 2000, 500, 1000];
    setLabelData(eg1);
    setDataSet(eg2);
  }, []);

  const [lineData, setLineData] = React.useState({});

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Data",
      },
    },
  };

  return (
    <div>
      <Line
        options={options}
        data={{
          labels: labelData,
          datasets: [
            {
              label: "Expense",
              data: dataSet,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        }}
      />
    </div>
  );
};

export default LineChartComponent;
