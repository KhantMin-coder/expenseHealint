import React, { useState } from "react";
import "./DeleteExpenseForm.scss";

const DeleteExpenseForm = ({ data, handleDelete }) => {
  const [inputData, setInputData] = useState("");

  return (
    <div className="delExpForm">
      <p>Are you sure you want to delete this</p>
      <p>
        <strong className="delExpForm-heading"> {data.expenseName}</strong> used
        for
        <strong className="delExpForm-heading"> {data.category}</strong> on
        &nbsp;
        {data.date}
      </p>
      <input
        className="delExpForm-inputField"
        placeholder={`Type ${data.expense} to Delete`}
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />

      <button
        className={`delExpForm-button ${
          Number(inputData) === data.expense
            ? "delExpForm-button-active"
            : "delExpForm-button-inactive"
        }`}
        onClick={() => {
          Number(inputData) === data.expense && handleDelete(data);
        }}
      >
        <span>Delete</span>
      </button>
    </div>
  );
};

export default DeleteExpenseForm;
