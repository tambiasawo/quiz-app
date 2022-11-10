import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  signUp: boolean;
}
function LoginForm({ signUp }: Props) {
  const formik = useFormik({
    initialValues: { email: "", password: "", name: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Email is invalid").required("Required"),
      password: Yup.string().required("Required").min(2).max(16),
      name: signUp
        ? Yup.string()
            .min(2, "Enter a valid first name")
            .max(15, "Enter a valid  name")
            .required()
        : Yup.string()
            .min(2, "Enter a valid first name")
            .max(15, "Enter a valid  name"),
    }),

    onSubmit: () => {
      alert(JSON.stringify(formik.values, null, 2));
    },
  });

  const NameField = (
    <input
      className={` form-control ${
        formik.errors.name && formik.touched.name ? "!border-red-400" : ""
      }`}
      type="text"
      placeholder="Name"
      {...formik.getFieldProps("name")}
    />
  );
  /*   {
    formik.errors.name && formik.touched.name && (
      <p className="text-red-400 font-light text-sm ">
        Please enter a valid Name
      </p>
    );
  } */
  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="relative mt-24 py-10 px-6 space-y-3 md:mt-0 md:max-w-md md:px-14"
      >
        {signUp && NameField}

        <input
          className={` form-control ${
            formik.errors.email && formik.touched.email ? "!border-red-400" : ""
          }`}
          type="email"
          placeholder="Email Address"
          {...formik.getFieldProps("email")}
        />
        {/*  {formik.errors.email && formik.touched.email && (
          <p className="text-red-400 font-light text-sm ">
            Please enter a valid email address
          </p>
        )} */}
        <input
          className={` form-control ${
            formik.errors.password && formik.touched.password
              ? "!border-red-400"
              : ""
          }`}
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
        />
        <button
          disabled={
            formik.errors.email || formik.errors.password ? true : false
          }
          type="submit"
          className="py-3 w-full rounded bg-[#027fff] disabled:bg-gray-300"
        >
          {signUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
