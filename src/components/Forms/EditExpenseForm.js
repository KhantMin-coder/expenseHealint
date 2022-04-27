import React, { useState } from "react";
import { ExpenseSchema } from "./ExpenseForm";
import { useFormik } from "formik";
import "./EditExpenseForm.scss";

const EditExpenseForm = ({ data, handleEdit }) => {
  const [inputData, setInputData] = useState("");

  const formik = useFormik({
    initialValues: {
      expenseName: data.expenseName,
      amount: data.expense,
      category: data.category,
    },
    validationSchema: ExpenseSchema,
    onSubmit: (values, { resetForm }) => {
      let editedData = {
        id: data.id,
        expense: values.amount,
        ...values,
        date: data.date,
      };
      handleEdit(editedData);
      resetForm();
    },
  });

  return (
    <div className="editExpForm">
      <form onSubmit={formik.handleSubmit}>
        <p className="editExpForm-label">Expense Name</p>
        <input
          id="expenseName"
          name="expenseName"
          placeholder="expense name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.expenseName}
          className="editExpForm-field"
        />
        {formik.touched.expenseName && formik.errors.expenseName ? (
          <div className="errorText">{formik.errors.expenseName}</div>
        ) : null}
        <p className="editExpForm-label">Expense Amount</p>
        <input
          id="amount"
          name="amount"
          type="number"
          placeholder="expense amount"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.amount}
          className="editExpForm-field"
        />
        {formik.touched.amount && formik.errors.amount ? (
          <div className="errorText">{formik.errors.amount}</div>
        ) : null}

        <p className="editExpForm-label">Expense Category</p>

        <select
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='editExpForm-select'
        >
          <option value="" label="Select a category">
            Select a category
          </option>
          <option value="Food" label="Food">
            Food
          </option>
          <option value="Utilities" label="Utilities">
            Utilities
          </option>
          <option value="Entertainment" label="Entertainment">
            Entertainment
          </option>
          <option value="Donation" label="Donation">
            Donation
          </option>
          <option value="Others" label="Others">
            Others
          </option>
        </select>
        {formik.errors.category ? (
          <div className="errorText">{formik.errors.category}</div>
        ) : null}
        <button className="editExpForm-button" type="submit">
          Update Expense
        </button>
      </form>
    </div>
  );
};

export default EditExpenseForm;
