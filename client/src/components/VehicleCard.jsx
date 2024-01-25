import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const VehicleCard = ({ vehicleInfo, handleDeleteVehicle }) => {

  return (
    <div className="vehicleCard" >
      <div className="vehicleCardInfo1">
        {vehicleInfo.name ? <h4>{vehicleInfo.name}</h4> : <h4>Vehicle</h4>}
        <p>{vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}</p>
      </div>
      <div className="vehicleCardInfo2">
      {vehicleInfo.details}
      </div>
      <div className="vehicleCardInfo3"> 
        <button className="rescheduleBtn">
          Edit
        </button>
        <button className="cancelBtn" onClick={() => handleDeleteVehicle(vehicleInfo)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default VehicleCard
