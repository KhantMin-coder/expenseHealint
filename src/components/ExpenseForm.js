import "./ExpenseForm.scss";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  expenseName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Expense Name is required"),
  amount: Yup.number().min(1).required("Expense Amount is required"),
  category: Yup.string()
    .oneOf(["designer", "development", "product", "other"], "Invalid Job Type")
    .required("Required"),
});

const ExpenseForm = () => {
  const formik = useFormik({
    initialValues: {
      expenseName: "",
      amount: 0,
      category: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
      </select>
      {formik.errors.category ? (
        <div className="errorText">{formik.errors.category}</div>
      ) : null}

      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
