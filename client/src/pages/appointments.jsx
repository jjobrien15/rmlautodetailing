import Schedule from "../pages/schedule";
import AppointmentCard from "../components/AppointmentCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserId } from "../hooks/useGetUserId";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import Popup from "reactjs-popup"
import "../stylesheets/appointments.scss"

const appointments = () => {
    const [userAppointments, setUserAppointments] = useState([])

    //useNavigate hook to redirect on logout
    const navigate = useNavigate();

    //Custom hook for to get User ID
    const userId = useGetUserId();

    async function handleCancelAppointment(apptID) {
        try{
            const response = await axios.delete(
                `${import.meta.env.VITE_BASE_URI}/profile/deleteAppointment/${apptID}`
            );
            alert("Appointment Successfully Deleted!")
            window.location.reload();
        } catch(err){
            console.log(err);
        }
    }

    //Use Effect will load current user appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            if (userId) {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_BASE_URI}/profile/appointments/${userId}`
                    );
                    setUserAppointments(response.data)
                } catch (err) {
                    console.log(err);
                }
            } else {
                navigate("/login");
            }
        }
        fetchAppointments();
        
    }, [userId])


    return (
    <div> 
        <div className="appointmentsHeader">
            <h1>Appointments</h1>
                <Popup className="popupSchedule" trigger={<button className="bookAppointmentBtn">Book Appointment <FontAwesomeIcon icon={faPlus} /></button> }modal nested>
                    <Schedule />
                </Popup>
        </div>

        <div className="appointmentCards">
                {userAppointments.length == 0 ? <p>You have no scheduled appointments...</p> :
                    userAppointments.map((apptInfo, key) => (
                        <AppointmentCard apptInfo={apptInfo} key={key} />
                    ))
                }
        </div>


            {/*<table className="appointmentsTable">
            <thead>
                <tr>
                        <th className="appointmentDateRow">Date</th>
                    <th className="appointmentServiceRow">Service</th>
                    <th className="appointmentOptionsRow">Options</th>
                </tr>
            </thead>
            <tbody>
            {userAppointments.length == 0 ? <tr><td>You have no scheduled appointments...</td></tr> :
            userAppointments.map((appointment, key) => (
                <tr key={key} className="userAppointment">
                    <td>{new Date(appointment.serviceDate).toLocaleString('en-US',{ month: "long", day: "numeric", year: "numeric"})}</td>
                    <td>{appointment.service}</td>
                    <td>
                        <button className="cancelBtn" onClick={() => handleCancelAppointment(appointment._id)}>
                            <FontAwesomeIcon icon={faBan} />
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
            </table>*/}
    </div>
    )
}

export default appointments;