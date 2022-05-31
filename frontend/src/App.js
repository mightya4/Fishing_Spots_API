// General Imports
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import DisplayMap from "./components/Maps/DisplayMap";
import GetLocation from "./components/Maps/GetLocation";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";


function App() {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()

  return (
    <div>
      <Navbar />
      <GetLocation setLatitude={setLatitude} setLongitude={setLongitude}/>
      <DisplayMap latitude={latitude} longitude={longitude}/>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
