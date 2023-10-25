import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form } from "formik";
import { ReactSelect } from "./ReactSelect";

const NewsFilter = ({
  filterValues,
  categories,
  sources,
  authors,
  show,
  onHide,
  onSubmit,
}) => {
  const initialValues = {
    category_id: filterValues?.category_id || null,
    source_id: filterValues?.source_id || null,
    author_name: filterValues?.author_name || null,
    date: filterValues?.date || "",
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Filter News</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values, resetForm }) => (
            <Form>
              <div className="mb-3">
                <ReactSelect
                  name="category_id"
                  label="Select Category"
                  isSearchable
                  isClearable
                  initialValue={values.category_id}
                  options={categories}
                  handleChange={setFieldValue}
                />
              </div>
              <div className="mb-3">
                <ReactSelect
                  name="source_id"
                  label="Select Source"
                  isSearchable
                  isClearable
                  initialValue={values.source_id}
                  options={sources}
                  handleChange={setFieldValue}
                />
              </div>
              <div className="mb-3">
                <ReactSelect
                  name="source_id"
                  label="Select Author"
                  isSearchable
                  isClearable
                  initialValue={values.author_name}
                  options={authors}
                  handleChange={setFieldValue}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="date">
                  Select Publish Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={values.date}
                  onChange={(e) => setFieldValue("date", e.target.value)}
                />
              </div>
              <div className="d-flex flex-row justify-content-between">
                <Button type="submit" variant="primary">
                  Apply Filters
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    resetForm(initialValues);
                    onSubmit(null);
                  }}
                >
                  Reset
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default NewsFilter;
