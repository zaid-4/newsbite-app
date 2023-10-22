import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { updateUserProfile } from "../setup/redux/actions/authAction";

const UserProfile = ({ user, updateUserProfile }) => {
  const initialValues = {
    name: user.name,
    email: user.email,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    oldPassword: Yup.string(),
    newPassword: Yup.string().min(
      6,
      "New Password must be at least 6 characters"
    ),
    confirmNewPassword: Yup.string().when("newPassword", {
      is: (newPassword) => newPassword && newPassword.length > 0,
      then: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm New Password is required"),
    }),
  });

  const onSubmit = (values) => {
    // Call the updateUserProfile action with the updated user data
    updateUserProfile(user?.id, values);
  };

  return (
    <div className="container">
      <h2>User Profile</h2>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
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
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field
                  type="email"
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
                <label htmlFor="oldPassword" className="form-label">
                  Old Password
                </label>
                <Field
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  className="form-control"
                />
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <Field
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="form-control"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmNewPassword" className="form-label">
                  Confirm New Password
                </label>
                <Field
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  className="form-control"
                />
                <ErrorMessage
                  name="confirmNewPassword"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </Form>
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

export default connect(mapStateToProps, { updateUserProfile })(UserProfile);
