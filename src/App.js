import React from "react";
import { BrowserRouter } from "react-router-dom";
import Route from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./contexts/auth";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={2500} />
        <Route />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
