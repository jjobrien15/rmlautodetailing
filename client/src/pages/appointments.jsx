import { useGetUserID } from "../hooks/useGetUserID";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const appointments = () => {
    const [appointments, setAppointments] = useState({})

    //useNavigate hook to redirect on logout
    const navigate = useNavigate();

    //Custome hook to get user id from local storage
    const userID = useGetUserID();
    //Use Effect will load current user appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            if (userID) {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_BASE_URI}/appointments/appointments/${userID}`
                    );
                    setAppointments(response.data);
                } catch (err) {
                    console.log(err);
                }
            } else {
                return navigate("/login");
            }
        }
        fetchAppointments();
    }, [])

    return (
    <div>
            <h1>Appointments</h1>
            { console.log(appointments) }
    </div>
    )
}

export default appointments;