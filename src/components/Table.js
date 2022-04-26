import React, { useState, useEffect } from "react";
import "./Table.scss";
import Pagination from "../components/Pagination";

const Table = ({ TD, showDeleteOperation, showEditOperation }) => {
  let [tableData, setTableData] = useState(TD.slice(0).reverse());
  let [currentTableData, setcurrentTableData] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Reverse the data to show the latest data
    let updatedTD = TD.slice(0).reverse();
    setTableData(updatedTD);

    // Calcualte the current page data
    const firstPageIndex = (currentPage - 1) * 10;
    const lastPageIndex = firstPageIndex + 10;
    setcurrentTableData(updatedTD.slice(firstPageIndex, lastPageIndex));
  }, [TD, currentPage]);

  return (
    <div>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Expense Name</th>
              <th>Expense</th>
              <th>Category</th>
              <th>Date Created</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {currentTableData.map((expenses, index) => {
              return (
                <tr key={expenses.id}>
                  <td>{expenses.id}</td>
                  <td>{expenses.expenseName}</td>
                  <td>{expenses.expense}</td>
                  <td>{expenses.category}</td>
                  <td>{expenses.date}</td>
                  <td>
                    <button
                      className="table-editButton"
                      onClick={() => showEditOperation(expenses)}
                    >
                      Edit
                    </button>
                    <button
                      className="table-deleteButton"
                      onClick={() => showDeleteOperation(expenses)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <Pagination
          // className="pagination-bar"
          currentPage={currentPage}
          totalCount={tableData.length}
          pageSize="10"
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Table;
