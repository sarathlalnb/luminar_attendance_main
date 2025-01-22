import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "./contexts/authContext";
import LoginPage from "./components/loginPage/LoginPage";
import BatchList from "./components/batchesList/BatchList";
import './App.css'
import QrDisplayPage from "./components/qrDisplay/QrDisplayPage";


function App() {
  const { getCurrentUser } = useContext(AuthContext);
  const user = getCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
    <Routes>
      <Route path="/" element={user ? <BatchList /> : <LoginPage />}></Route>
      <Route path="/qrPage" element={<QrDisplayPage />} />
      </Routes>
      </>
  );
}

export default App;
