import { useState } from "react"

import React from "react"

const EditAppointment = ({apptInfo}) => {

    const [appointment, setAppointment] = useState({
        service: apptInfo.service,
        phone: apptInfo.phone,
        serviceDate: apptInfo.serviceDate,
        serviceTime: apptInfo.serviceTime,
    })

     //used to set state of each input field based on name of input
     const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment({ ...vehicle, [name]: value });
    }

  return (
    <div>
       <div className="formPageContent">
                <h1>Schedule Serivce</h1>
        <form>
            <div className="formGroup">
            <label htmlFor="service">Service: </label>
            <select name="service" id="service" onChange={handleChange}>
                <option selected value={appointment.service}>{appointment.service}</option>
                <option value="Ceramic Coating">Ceramic Coating</option>
                <option value="Express Wash">Express Wash</option>
                <option value="2-step Correction">2-step Correction</option>
                <option value="Boats">Boats</option>
                <option value="Motorcycle">Motorcycle</option>
            </select> 
            </div>
            <div className="formGroup">
                <label htmlFor="phone">Phone:</label>
                <input type="text" name="phone" id="phone" value={appointment.phone}  onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="serviceDate">Date:</label>
                <input type="date" name="serviceDate" id="serviceDate" value={appointment.serviceDate} onChange={handleChange}/>
            </div>
            <div className="formGroup">
                {/* If date is not selected disbale select object else enable and show available dates for that date*/}
                <label htmlFor="serviceTime">Time:</label>
                <input type="time" min="08:00" max="17:00" step="5" name="serviceTime" id="serviceTime" value={appointment.serviceTime} onChange={handleChange}/>
            </div>

            <div className="formGroup">
                <button className="submitBtn" type="submit">Schedule</button>
            </div>
        </form>
            <p>Need to review or edit an already scheduled service? <a className="formLinks" href="Appointments">View Your Schedule</a></p>
        </div>
    </div>
  )
}

export default EditAppointment
