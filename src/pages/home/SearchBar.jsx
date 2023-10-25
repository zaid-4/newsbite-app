import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./home.module.css";
import { VscSettings } from "react-icons/vsc";

export const SearchBar = ({ searchTerm, handleSearch, setShowFilterModal }) => (
  <div
    className={`w-100 d-flex flex-column flex-md-row justify-content-between mb-4`}
  >
    <Form.Group className={`mb-3 mb-md-0 ${styles.searchBar}`}>
      <Form.Control
        type="text"
        placeholder="Search News..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </Form.Group>
    <Button variant="primary" onClick={() => setShowFilterModal(true)}>
      <VscSettings size={20} style={{ cursor: "pointer" }} /> Filters
    </Button>
  </div>
);
