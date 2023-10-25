import React from "react";

const Loader = ({ loading }) => {
  return loading ? (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  ) : null;
};

export default Loader;
