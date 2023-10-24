import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, useField } from "formik";
import { ReactSelect } from "./ReactSelect";

const NewsFilter = ({
  filterValues,
  categories,
  sources,
  show,
  onHide,
  onSubmit,
}) => {
  const initialValues = {
    category_id: filterValues?.category_id || null,
    source_id: filterValues?.source_id || null,
    author_name: filterValues?.author_name || "",
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
          {({ setFieldValue, values }) => (
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
                  label="Select Category"
                  isSearchable
                  isClearable
                  initialValue={values.source_id}
                  options={sources}
                  handleChange={setFieldValue}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="author_name" className="form-label">
                  Author Name
                </label>
                <TextField name="author_name" />
              </div>

              <Button type="submit" variant="primary">
                Apply Filters
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

const TextField = ({ name }) => {
  const [field] = useField(name);

  return <input {...field} className="form-control" />;
};

export default NewsFilter;
