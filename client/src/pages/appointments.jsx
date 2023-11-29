import { useGetUserID } from "../hooks/useGetUserID";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../stylesheets/appointments.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'

const appointments = () => {
    const [userAppointments, setUserAppointments] = useState([])

    //useNavigate hook to redirect on logout
    const navigate = useNavigate();

    //Custome hook to get user id from local storage
    const userID = useGetUserID();

    async function handleCancelAppointment(apptID) {
        try{
            const response = await axios.delete(
                `${import.meta.env.VITE_BASE_URI}/appointments/deleteAppointment/${apptID}`
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
            if (userID) {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_BASE_URI}/appointments/appointments/${userID}`
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
    }, [userID])


    return (
    <div>
            <h1>Appointments</h1>
            <table className="appointmentsTable">
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
            </table>
    </div>
    )
}

export default appointments;