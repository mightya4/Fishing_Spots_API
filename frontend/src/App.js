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
import GetLocation from "./components/Maps/GetLocation";
import GoogleMaps from "./components/Maps/GoogleMaps";
import SearchBox from "./components/Search/SearchBox";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";




function App() {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [searchResults, setSearchResults] = useState("")

  return (
    <div>
      <Navbar />
      <SearchBox searchResults={searchResults} setSearchResults={setSearchResults}/>
      <GetLocation searchResults={searchResults} setLatitude={setLatitude} setLongitude={setLongitude}/>
      <GoogleMaps latitude={latitude} longitude={longitude} searchResults={searchResults}/>
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
