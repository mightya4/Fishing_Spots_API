import axios from 'axios';

const CrudEssentials = () => {

    return ( <></> );
}


const getAllFavoriteParks =  async (userToken) => {
    let response;
    try {
        const config = {
            headers: { Authorization: `Bearer ${userToken}`}
        };
        
        response = await axios.get("http://127.0.0.1:8000/api/map/all_saved_fishing_spots", config);

      } catch (error) {
        console.log(error.response.data);
      } 
      return response.data
    }

const addFavoritePark = async (userToken, JsonObject) => {
        
    try {
        const config = {
            headers: { Authorization: `Bearer ${userToken}`}
        };
        
        let response = await axios.post("http://127.0.0.1:8000/api/map/all_saved_fishing_spots", JsonObject, config);

      } catch (error) {
        console.log(error.response.data);
      }
    }

const deleteAllFavoritePark = async (userToken) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${userToken}`}
        }
        
        let response = await axios.delete("http://127.0.0.1:8000/api/map/all_saved_fishing_spots", config)
    } catch (error) {
        console.log(error.response.data)
    }
}

const getFavoriteParkByID =  async (userToken, num) => {
    let response
    try {
        const config = {
            headers: { Authorization: `Bearer ${userToken}`}
        };
        
        response = await axios.get(`http://127.0.0.1:8000/api/map/fishing_spot/${num}`, config);

      } catch (error) {
        console.log(error.response.data);
      }
      return response
    }

const updateFavoriteParkByID = async (userToken, num, JsonObject) => {
        
    try {
        const config = {
            headers: { Authorization: `Bearer ${userToken}`}
        };
        
        let response = await axios.put(`http://127.0.0.1:8000/api/map/fishing_spot/${num}`, JsonObject, config);

      } catch (error) {
        console.log(error.response.data);
      }

    }

const deleteFavoriteParkByID = async (userToken, num) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${userToken}`}
        }
        
        let response = await axios.delete(`http://127.0.0.1:8000/api/map/fishing_spot/${num}`, config)
    } catch (error) {
        console.log(error.response.data)
    }
}


 
export default CrudEssentials;
export {getAllFavoriteParks, addFavoritePark, deleteAllFavoritePark, getFavoriteParkByID, updateFavoriteParkByID, deleteFavoriteParkByID}