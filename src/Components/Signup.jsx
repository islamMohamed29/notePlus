import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../utils/LoadingScreen";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Dropzone from "react-dropzone";
import { signUp } from "../redux/slices/user-slice";

export default function Signup() {
  let dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const onDrop = (acceptedFiles) => {
    setAvatar(acceptedFiles[0]);
  };
  const loadingAuth = useSelector((state) => state.user.loadingAuth);
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("* In-Valid Email")
      .required("* Email Is Required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/^\S*$/, "Password must not contain whitespace"),
    username: Yup.string().required("* Username Is Required"),
  });
  const handleSignUp = async (values) => {
    const { email, password, username } = values;
    let userData = {
      email,
      password,
      username,
      avatar,
    };
    dispatch(signUp(userData));
  };
  const dropzoneStyles = {
    border: "2px dashed #0087F7",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
  };
  return (
    <>
      {loadingAuth && <LoadingScreen />}
      <div className="form-parent">
        <main className="form-auth">
          <Formik
            initialValues={{ email: "", password: "", username: "" }}
            validationSchema={SignupSchema}
            onSubmit={handleSignUp}
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
                <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>
                <div className="box-avatar">
                  {!avatar && (
                    <Dropzone onDrop={onDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <section className="drag-here">
                          <div {...getRootProps()} style={dropzoneStyles}>
                            <input {...getInputProps()} />
                            <p>
                              (إختيارى) <br /> قم بسحب الصورة هنا او إنقر
                              لاختيارها
                            </p>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  )}

                  {avatar && (
                    <div className="isAvatar">
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="Avatar"
                        className="avatar"
                      />
                    </div>
                  )}
                </div>
                <div className="form-floating">
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    className={`form-control ${
                      touched.username && errors.username ? "is-invalid" : ""
                    }`}
                  />
                  <label for="username">Username</label>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
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
                  <label for="email">Email address</label>
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
                  {errors.password && touched.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                  {touched.password && !errors.password && (
                    <div style={{ color: "green" }}>
                      All password requirements met.
                    </div>
                  )}
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">
                  Sign Up
                </button>
                <div className="already_have mt-2">
                  Already have an account
                  <Link className="ms-1" to={"/signin"}>
                    Login
                  </Link>
                </div>

                <p className="mt-5 mb-3 text-muted">&copy; 2023–2024</p>
              </Form>
            )}
          </Formik>
          {/* <form id="my-form" onSubmit={(e) => handleSignUp(e)}>
            <div className="form-floating"></div>
           
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                name="password"
                id="floatingPassword"
                onChange={(e) => getUserData(e)}
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>

           
          </form> */}
        </main>
      </div>
    </>
  );
}
