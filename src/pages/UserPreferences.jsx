import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { ReactSelect } from "../components/ReactSelect";
import { Button } from "react-bootstrap";
import { updateUserPrefrences } from "../setup/redux/actions/authAction";
import { getNewsMeta } from "../setup/redux/actions/newsAction";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace as BackArrow } from "react-icons/md";
import Loader from "../components/Loader";
import { makeLabelOptions, makeOptions } from "../utils/helpers";

const UserPreferences = ({
  user,
  sources,
  categories,
  authors,
  loading,
  updateUserPrefrences,
  getNewsMeta,
}) => {
  useEffect(() => {
    getNewsMeta({ type: "all" });
  }, []);

  const navigate = useNavigate();
  const authorOptions = makeLabelOptions(authors);
  const categoryOptions = makeOptions(categories);
  const sourceOptions = makeOptions(sources);
  const preferences = user?.preferences;
  const initialValues = {
    favorite_sources: preferences?.favorite_sources || [],
    favorite_categories: preferences?.favorite_categories || [],
    favorite_authors: preferences?.favorite_authors || [],
  };

  const onSubmit = (values) => {
    updateUserPrefrences(values);
  };

  return (
    <div className="container">
      <Loader loading={loading} />
      <div className="w-100 text-start mb-3">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          <BackArrow size={24} style={{ cursor: "pointer" }} /> {"Back"}
        </Button>
      </div>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 text-start">
          <h2>News Preferences</h2>
          <p>
            Customize your news feed by selecting preferred sources, categories,
            and authors
          </p>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ setFieldValue, values, resetForm }) => (
              <Form>
                <div className="mb-3">
                  <ReactSelect
                    name="favorite_categories"
                    label="News Categories"
                    isSearchable
                    isClearable
                    isMulti
                    initialValue={values.favorite_categories}
                    options={categoryOptions}
                    handleChange={setFieldValue}
                  />
                </div>
                <div className="mb-3">
                  <ReactSelect
                    name="favorite_sources"
                    label="News Sources"
                    isSearchable
                    isClearable
                    isMulti
                    initialValue={values.favorite_sources}
                    options={sourceOptions}
                    handleChange={setFieldValue}
                  />
                </div>
                <div className="mb-3">
                  <ReactSelect
                    name="favorite_authors"
                    label="News Authors"
                    isSearchable
                    isClearable
                    isMulti
                    initialValue={values.favorite_authors}
                    options={authorOptions}
                    handleChange={setFieldValue}
                  />
                </div>
                <div className="d-flex flex-row justify-content-between">
                  <Button type="submit" variant="primary">
                    Save Preferences
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    categories: state.news.categories,
    sources: state.news.sources,
    authors: state.news.authors,
    loading: state.ui.loading,
  };
};
export default connect(mapStateToProps, { updateUserPrefrences, getNewsMeta })(
  UserPreferences
);
