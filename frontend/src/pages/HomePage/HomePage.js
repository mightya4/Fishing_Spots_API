import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import GoogleMaps from "../../components/Maps/GoogleMaps";

import axios from "axios";

const HomePage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);
  const [savedParks, setSavedParks] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCars(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchCars();
  }, [token]);

  useEffect(() => {
    const fetchAllSavedParks = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/map/all_saved_fishing_spots", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setSavedParks(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchAllSavedParks();
  }, [token]);

  return (
    <div className="container">
      {/* <h1>Home Page for {user.username}!</h1> */}
      {/* {cars &&
        cars.map((car) => (
          <p key={car.id}>
            {car.year} {car.model} {car.make}
          </p>
        ))} */}
        <GoogleMaps setParks = {props.setParks}/>
        {/* Display all saved parks data underneath map */}
        { savedParks && savedParks.map((park) => (
          <p key={park.id}>
            {park.user}
            {park.name} {park.rating} {park.is_fishing_location} {park.has_fished} {park.types_of_fish} {park.formatted_address} {park.latitude} {park.longitude} 
          </p>
        ))

        }
    </div>
  );
};

export default HomePage;
