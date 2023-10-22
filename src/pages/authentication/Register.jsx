import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../setup/redux/actions/authAction";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const RegisterComponent = ({ register }) => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = async (values, actions) => {
    const isSubmit = await register(values);
    if (isSubmit) {
      navigate("/");
    }
    actions.setSubmitting(false);
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label w-100 text-start">
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label w-100 text-start"
                  >
                    Email
                  </label>
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label w-100 text-start"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label w-100 text-start"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <p>
                  {"Already have an account?"} <Link to="/login">Login</Link>
                </p>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export const Register = connect(mapStateToProps, { register })(
  RegisterComponent
);
