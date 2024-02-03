import EditVehicle from "./EditVehicle"
import Popup from "reactjs-popup"

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
        <Popup className="popupEditVehicle" trigger={<button className="editVehicleBtn">Edit</button>} modal nested>
          <EditVehicle vehicleInfo={vehicleInfo} />
        </Popup>
        <button className="cancelBtn" onClick={() => handleDeleteVehicle(vehicleInfo)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default VehicleCard
