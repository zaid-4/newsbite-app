import React from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./Routes/PrivateRoutes";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <div className="App">
      <AppLayout>
        <PrivateRoutes />
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AppLayout>
    </div>
  );
}

export default App;
