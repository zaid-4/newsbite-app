import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { connect } from "react-redux";
import { updateUserProfile } from "../setup/redux/actions/authAction";
import { Button } from "react-bootstrap";
import { MdOutlineKeyboardBackspace as BackArrow } from "react-icons/md";
import Loader from "../components/Loader";

const UserProfile = ({ user, updateUserProfile, loading }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    old_password: Yup.string(),
    new_password: Yup.string().min(
      8,
      "New Password must be at least 8 characters"
    ),
    confirm_new_password: Yup.string().oneOf(
      [Yup.ref("new_password"), null],
      "New Password must match"
    ),
  });

  const navigate = useNavigate();

  const initialValues = {
    name: user.name,
    email: user.email,
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  };

  const onSubmit = (values) => {
    if (values.old_password === "") delete values.old_password;
    if (values.new_password === "") delete values.new_password;
    if (values.confirm_new_password === "") delete values.confirm_new_password;
    updateUserProfile(values);
  };

  return (
    <div className="container">
      <Loader loading={loading} />
      <h2>User Profile</h2>
      <div className="w-100 text-start mb-3">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          <BackArrow size={24} style={{ cursor: "pointer" }} /> {"Back"}
        </Button>
      </div>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 text-start">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ resetForm }) => (
              <Form>
                <FormField label="Name" name="name" type="text" />
                <FormField label="Email" name="email" type="email" />
                <FormField
                  label="Old Password"
                  name="old_password"
                  type="password"
                />
                <FormField
                  label="New Password"
                  name="new_password"
                  type="password"
                />
                <FormField
                  label="Confirm New Password"
                  name="confirm_new_password"
                  type="password"
                />

                <div className="d-flex flex-row justify-content-between">
                  <Button type="submit" variant="primary">
                    Update Profile
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      resetForm(initialValues);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, name, type }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <Field
      type={type}
      id={name}
      name={name}
      className="form-control"
      autoComplete="off"
    />
    <ErrorMessage name={name} component="div" className="text-danger" />
  </div>
);

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.ui.loading,
  };
};

export default connect(mapStateToProps, { updateUserProfile })(UserProfile);
