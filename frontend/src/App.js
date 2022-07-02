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
import FavoriteParks from "./pages/FavoriteParks/FavoriteParks";
import DisplayParks from "./components/Maps/DisplayParks";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";




function App() {
  const [parks, setParks] = useState([])
  const [favoriteParks, setFavoriteParks] = useState([])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage parks = {parks} setParks = {setParks}/>
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path = "/displayparks" element={<DisplayParks  favoriteParks = {favoriteParks} setFavoriteParks = {setFavoriteParks} parks = {parks} setParks = {setParks}/>} />
        <Route path = "/favoriteparks" element={<FavoriteParks  favoriteParks = {favoriteParks}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
