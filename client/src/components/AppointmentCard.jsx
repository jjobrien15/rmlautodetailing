import EditAppointment from './EditAppointment'
import Popup from 'reactjs-popup'


const AppointmentCard = ({apptInfo, handleDeleteAppointment}) => {

    return (
      <div className="appointmentCard">
        <div className="appointmentCardInfo1">
          <h4>Service Details</h4>
          <p>{apptInfo.service}</p>
          <p>{new Date(apptInfo.serviceDate).toLocaleString('en-US', { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
        <div className="appointmentCardInfo2">
          <h4>Detailer</h4>
          <p>Jon Stamos</p>
        </div>
        <div className="appointmentCardInfo3">
        <Popup className="popupEditVehicle" trigger={<button className="rescheduleBtn">Reschedule</button>} modal nested>
          <EditAppointment apptInfo={apptInfo} />
        </Popup>
          <button className="cancelBtn" onClick={() => handleDeleteAppointment(apptInfo)}>
            Cancel
          </button>
        </div>
    </div>
  )
}

export default AppointmentCard
