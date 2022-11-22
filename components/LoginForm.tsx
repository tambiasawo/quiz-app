import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  signUp: boolean;
}
function LoginForm({ signUp }: Props) {
  const router = useRouter();
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

    onSubmit: async () => {
      if (signUp) {
        const options = {
          name: formik.values.name,
          email: formik.values.email,
          password: formik.values.password,
        };
        const response = await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(options),
        }).then((res) =>
          res.json().then((data) => {
            if (data) return data;
          })
        );
        if (response) {
          router.push("/");
        }
      } else {
        const status = await signIn("credentials", {
          redirect: false,
          email: formik.values.email,
          password: formik.values.password,
          callbackUrl: "/",
        });
        if (status?.ok) {
          router.push(status?.url || "/");
        }
        console.log(status);
      }
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

  const handleSignIn = async () => {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  };
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
        className="relative py-10 px-6 space-y-3 md:mt-0 md:max-w-md md:px-14"
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
        {!signUp && (
          <button
            type="button"
            onClick={handleSignIn}
            className="py-3 w-full rounded bg-[#7a7d81] disabled:bg-gray-300"
          >
            Sign In with Google
          </button>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
