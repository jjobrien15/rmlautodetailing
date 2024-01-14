import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'


const AppointmentCard = ({apptInfo}) => {

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
          <button className="rescheduleBtn">
            Reschedule
          </button>
          <button className="cancelBtn">
            Cancel
          </button>
        </div>
    </div>
  )
}

export default AppointmentCard
