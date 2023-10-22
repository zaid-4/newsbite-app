import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { login } from "../../setup/redux/actions/authAction";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as Yup from "yup";

const LoginComponent = ({ login }) => {
  const navigate = useNavigate();
  // Initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  // Form submission handler
  const onSubmit = async (values, actions) => {
    // Handle login logic here
    const isSubmit = await login(values);
    if (isSubmit) {
      navigate("/");
    }
    actions.setSubmitting(false);
  };

  return (
    <div className="container">
      <h2>Login</h2>
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

                <p>
                  {"Don't have an account?"}{" "}
                  <Link to="/register">Register</Link>
                </p>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
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

export const Login = connect(mapStateToProps, { login })(LoginComponent);
