import { useEffect } from 'react';

const GetLocation = (props) => {
    async function FindCoordinates(currentSite){
        props.setLatitude(currentSite.coords.latitude);
        console.log(currentSite.coords.latitude)
        props.setLongitude(currentSite.coords.longitude);
        console.log(currentSite.coords.longitude)
    }
        useEffect(() => {
            FindLocation()
          }, [])

        

    const FindLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(FindCoordinates);
        }else{
            console.log("Geolocation is not supported by this browser");
        }
        }
    return ( 
        <div></div>
     );
}
export default GetLocation;