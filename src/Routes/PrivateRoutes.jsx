import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/home/Home";
import { Login } from "../pages/authentication/Login";
import { Register } from "../pages/authentication/Register";
import UserProfile from "../pages/UserProfile";
import NewsDetail from "../pages/news/NewsDetail";

const PrivateRoutes = () => {
  const isAuthorized = useSelector(({ auth }) => auth.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthorized ? <Home /> : <Navigate to="/login" replace={true} />
        }
      />
      <Route
        path="/profile"
        element={
          isAuthorized ? (
            <UserProfile />
          ) : (
            <Navigate to="/login" replace={true} />
          )
        }
      />
      <Route
        path="/news/:newsId"
        element={
          isAuthorized ? (
            <NewsDetail />
          ) : (
            <Navigate to="/login" replace={true} />
          )
        }
      />
      <Route
        path="/login"
        element={isAuthorized ? <Navigate to="/" replace={true} /> : <Login />}
      />
      <Route
        path="/register"
        element={
          isAuthorized ? <Navigate to="/" replace={true} /> : <Register />
        }
      />
    </Routes>
  );
};

export default PrivateRoutes;
