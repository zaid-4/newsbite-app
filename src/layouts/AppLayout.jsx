import React from "react";
import { connect } from "react-redux"; // Import connect from react-redux
import { logout } from "../setup/redux/actions/authAction"; // Import your logout action
import { Header } from "../components/Header";

const AppLayout = ({ children, isAuthenticated, logout }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {/* Header */}
      <Header onLogout={handleLogout} isAuthenticated={isAuthenticated} />

      {/* Body */}
      <div className="container mt-4">{children}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, { logout })(AppLayout);
