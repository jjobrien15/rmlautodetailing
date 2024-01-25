import { useEffect, useState } from "react"
import { useGetUserId } from "../hooks/useGetUserId"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import axios from "axios"
import VehicleCard from "../components/VehicleCard"
import Popup from "reactjs-popup"
import toast from "react-hot-toast";
import AddVehicle from '../components/addVehicle'

import "../stylesheets/vehicles.scss"


const Vehicles = () => {

  const [userVehicles, setUserVehicles] = useState([]);
  const userId = useGetUserId();

  //Use Effect will load current user vehivles
  useEffect(() => {
    const fetchAppointments = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URI}/profile/vehicles/${userId}`
          );
          setUserVehicles(response.data)
        } catch (err) {
          console.log(err);
        }
      } else {
        navigate("/login");
      }
    }
    fetchAppointments();
    
  }, [userId]);

   //Function to delete vehicles
  const handleDeleteVehicle = async ( vehicleInfo ) => {
    try{
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URI}/profile/deleteVehicle/${vehicleInfo._id}`);
      if (!response.data.error) {
        let remainingVehicles = userVehicles.filter((vehicles) => { return vehicles !== vehicleInfo });
        setUserVehicles(remainingVehicles);
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
      
    } catch(err){
        console.log(err);
    }
}

  return (
    <div>
      <div className="vehiclesHeader">
        <h1>My Vehicles</h1>
            <Popup className="popupAddVehicle" trigger={<button className="addVehicleBtn">Add Vehicle <FontAwesomeIcon icon={faPlus} /></button> }modal nested>
                <AddVehicle />
            </Popup>
      </div>
      <div className="vehicleCards">
          {userVehicles.length == 0 ? <p>You have no Vehicles to display at this time....</p> : 
          userVehicles.map((vehicleInfo, key) => (
            <VehicleCard vehicleInfo={vehicleInfo} key={key} handleDeleteVehicle={handleDeleteVehicle} />
          ))
          }
      </div>
    </div>
  )
}

export default Vehicles
