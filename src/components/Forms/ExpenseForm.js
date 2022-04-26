import "./ExpenseForm.scss";
import React from "react";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from "yup";

export const ExpenseSchema = Yup.object().shape({
  expenseName: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Expense Name is required"),
  amount: Yup.number().min(1).required("Expense Amount is required"),
  category: Yup.string()
    .oneOf(
      ["Food", "Utilities", "Entertainment", "Donation", "Others"],
      "Invalid Category Type"
    )
    .required("Required"),
});

const ExpenseForm = ({ data, setData }) => {
  const createNewExpense = (values) => {
    let newExpense = {
      id: data.length + 1,
      expenseName: values.expenseName,
      expense: values.amount,
      category: values.category,
      date: moment().format("DD/MM/YYYY"),
    };

    setData([...data, newExpense]);
  };

  const formik = useFormik({
    initialValues: {
      expenseName: "",
      amount: 0,
      category: "",
    },
    validationSchema: ExpenseSchema,
    onSubmit: (values, { resetForm }) => {
      createNewExpense(values);
      resetForm();
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        id="expenseName"
        name="expenseName"
        placeholder="expense name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.expenseName}
        className="inputField"
      />
      {formik.touched.expenseName && formik.errors.expenseName ? (
        <div className="errorText">{formik.errors.expenseName}</div>
      ) : null}

      <input
        id="amount"
        name="amount"
        type="number"
        placeholder="expense amount"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.amount}
        className="inputField"
      />
      {formik.touched.amount && formik.errors.amount ? (
        <div className="errorText">{formik.errors.amount}</div>
      ) : null}

      <select
        name="category"
        value={formik.values.category}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        style={{ width: "80%", marginBottom: "20px" }}
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

      <button className="button" type="submit">
        Create New Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
