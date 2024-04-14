import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoadingScreen from "../utils/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/slices/user-slice";
export default function Signin() {
  const loadingAuth = useSelector((state) => state.user.loadingAuth);

  let dispatch = useDispatch();

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email("* In-Valid Email")
      .required("* Email Is Required"),
    password: Yup.string().required("* Password Is Required"),
  });

  const handleSignIn = async (values) => {
    const { email, password } = values;
    let userData = {
      email,
      password,
    };
    dispatch(signIn(userData));
  };

  return (
    <>
      {loadingAuth && <LoadingScreen />}
      <div className="form-parent">
        <main className="form-auth">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SigninSchema}
            onSubmit={handleSignIn}
          >
            {({ errors, touched }) => (
              <Form>
                <img
                  className="mb-4"
                  src="assets/logo.png"
                  alt=""
                  width="72"
                  height="72"
                />
                <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>

                <div className="form-floating">
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                    className={`form-control ${
                      touched.email && errors.email ? "is-invalid" : ""
                    }`}
                  />
                  <label htmlFor="email">Email address</label>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-floating">
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className={`form-control ${
                      touched.password && errors.password ? "is-invalid" : ""
                    }`}
                  />
                  <label htmlFor="password">Password</label>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">
                  Sign In
                </button>
                <div className="new_account mt-2">
                  Create a new account
                  <Link className="ms-1" to={"/signup"}>
                    Register
                  </Link>
                </div>

                <p className="mt-5 mb-3 text-muted">&copy; 2023–2024</p>
              </Form>
            )}
          </Formik>
        </main>
      </div>
    </>
  );
}
