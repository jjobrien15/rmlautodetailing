import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../stylesheets/formPageStyles.scss"
import { useState } from "react"
import axios from "axios"
import { useGetUserID } from "../hooks/useGetUserID"

const schedule = () => {
    //state to determine if a date is selected for form
    const [dateSelected, setDateSelected] = useState(false);

    //Custome hook to get user id from local storage
    const userID = useGetUserID();

    //state for details of appointment. Changes using handleChange function
    const [appointment, setAppointment] = useState({
        clientInfo: userID,
        service: "",
        phone: "",
        serviceDate: "",
        serviceTime: "",
    })

    //used to set state of each input field based on name of input
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setAppointment({ ...appointment, [name]: value });
    }
    //Hanldes submitting form and creating/saving information in DB
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.BASE_URI}/appointments/createAppointment`, appointment)
            alert("Appointment Created!");
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div>
        <Navbar />
          <div className="banner">
              <div className="formPageContent">
                <h1>Schedule Serivce</h1>
                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="service">Service: </label>
                        <select name="service" id="service" onChange={handleChange}>
                            <option value="Ceramic Coating">Ceramic Coating</option>
                            <option value="Express Wash">Express Wash</option>
                            <option value="2-step Correction">2-step Correction</option>
                            <option value="Boats">Boats</option>
                            <option value="Motorcycle">Motorcycle</option>
                        </select> 
                      </div>
                      <div className="formGroup">
                          <label htmlFor="phone">Phone:</label>
                          <input type="text" name="phone" id="phone" placeholder="Phone..."  onChange={handleChange}/>
                      </div>
                      <div className="formGroup">
                          <label htmlFor="serviceDate">Date:</label>
                          <input type="date" name="serviceDate" id="serviceDate" onChange={handleChange}/>
                      </div>
                      <div className="formGroup">
                          {/* If date is not selected disbale select object else enable and show available dates for that date*/}
                          <label htmlFor="serviceTime">Time:</label>
                            <select name="serviceTime" id="serviceTime" onChange={handleChange} >
                            <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select>
                      </div>

                      <div className="formGroup">
                          <button className="submitBtn" type="submit">Schedule</button>
                      </div>
                  </form>
                  <p>Need to review or edit an already scheduled service? <a className="formLinks" href="Login">View Your Schedule</a></p>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default schedule
