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
import GoogleMaps from "./components/Maps/GoogleMaps";
import SearchBox from "./components/Search/SearchBox";
import DisplayParks from "./components/Maps/DisplayParks";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";




function App() {
  const [searchResults, setSearchResults] = useState("")
  const [parks, setParks] = useState([])

  return (
    <div>
      <Navbar />
      <SearchBox searchResults={searchResults} setSearchResults={setSearchResults}/>
      <GoogleMaps setParks = {setParks}/>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path = "/displayparks" element={<DisplayParks parks={parks}/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
