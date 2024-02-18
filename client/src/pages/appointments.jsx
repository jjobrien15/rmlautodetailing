import Schedule from "../pages/schedule";
import AppointmentCard from "../components/AppointmentCard";
import axios from "axios";
import Popup from "reactjs-popup"
import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserId } from "../hooks/useGetUserId";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from "react-cookie"

import "../stylesheets/appointments.scss"

const appointments = () => {
    const [userAppointments, setUserAppointments] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);

    //useNavigate hook to redirect on logout
    const navigate = useNavigate();

    //Custom hook for to get User ID
    const userId = useGetUserId();

    //Use Effect will load current user appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            if (userId) {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_BASE_URI}/profile/appointments/${userId}`,
                        {
                            headers: {
                                auth: cookies.access_token
                            }
                        }
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

    //Delete appointment from appointment card.
    const handleDeleteAppointment = async (apptInfo) => {
        try{
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URI}/profile/deleteAppointment/${apptInfo._id}`);
            if (!response.data.error) {
                let remainingAppointments = userAppointments.filter((appointments) => { return appointments !== apptInfo });
                setUserAppointments(remainingAppointments);
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
        <div className="appointmentsHeader">
            <h1>My Appointments</h1>
                <Popup className="popupSchedule" trigger={<button className="bookAppointmentBtn">Book Appointment <FontAwesomeIcon icon={faPlus} /></button> }modal nested>
                    <Schedule />
                </Popup>
        </div>

        <div className="appointmentCards">
                {userAppointments.length == 0 ? <p>You have no scheduled appointments...</p> :
                    userAppointments.map((apptInfo, key) => (
                        <AppointmentCard apptInfo={apptInfo} key={key} handleDeleteAppointment={handleDeleteAppointment} />
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