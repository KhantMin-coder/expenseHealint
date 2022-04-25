import React, { useState, useMemo, useEffect } from "react";
import Pagination from "../components/Pagination";

const Table = ({ TD }) => {
  let [tableData, setTableData] = useState(TD.slice(0).reverse());
  let [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let updatedTD = TD.slice(0).reverse()
    setTableData(updatedTD);
  }, [TD]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 10;
    const lastPageIndex = firstPageIndex + 10;
    return tableData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <div>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Expense Name</th>
            <th>Expense</th>
            <th>Category</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((expenses) => {
            return (
              <tr key={expenses.id}>
                <td>{expenses.id}</td>
                <td>{expenses.expenseName}</td>
                <td>{expenses.expense}</td>
                <td>{expenses.category}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        // className="pagination-bar"
        currentPage={currentPage}
        totalCount={tableData.length}
        pageSize="10"
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Table;
