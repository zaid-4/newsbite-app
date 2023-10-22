import React from 'react';
import './App.css';
import PrivateRoutes from './Routes/PrivateRoutes';
import AppLayout from './layouts/AppLayout';

function App() {
  return (
    <div className="App">
      <AppLayout>
        <PrivateRoutes />
      </AppLayout>
    </div>
  );
}

export default App;
