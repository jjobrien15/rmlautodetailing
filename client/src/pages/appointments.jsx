import { useGetUserID } from "../hooks/useGetUserID";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appointmentModel } from "../../../server/src/models/appointmentsModel";

const appointments = () => {
    const [userAppointments, setUserAppointments] = useState([])

    //useNavigate hook to redirect on logout
    const navigate = useNavigate();

    //Custome hook to get user id from local storage
    const userID = useGetUserID();
    //Use Effect will load current user appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            if (userID) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_BASE_URI}/appointments/appointments/${userID}`, {
                            method: 'GET',
                        }
                    );
                    const data = await response.json();
                    setUserAppointments(data);
                } catch (err) {
                    console.log(err);
                }
            } else {
                return navigate("/login");
            }
        }
        fetchAppointments();
    }, [userID])

    return (
    <div>
            <h1>Appointments</h1>
            {userAppointments.map((appointment, key) => (
                <p key={key}>{appointment.service}</p>
            ))}
    </div>
    )
}

export default appointments;