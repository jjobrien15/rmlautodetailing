import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../stylesheets/formPageStyles.scss"
import { useState } from "react"

const availableDates = [];

const availableTimes = [
    {time: "12:00", amPm: "pm"},
    {time: "01:00", amPm: "pm"},
    {time: "11:00", amPm: "am"},
];

const schedule = () => {
    //state to determine if a date is selected for form
    const [dateSelected, setDateSelected] = useState(false)

  return (
    <div>
        <Navbar />
          <div className="banner">
              <div className="formPageContent">
                <h1>Schedule Serivce</h1>
                <form action="">
                    <div className="formGroup">
                        <label htmlFor="service">Service: </label>
                        <select name="service" id="chosenService">
                            <option value="Ceramic Coating">Ceramic Coating</option>
                            <option value="Express Wash">Express Wash</option>
                            <option value="2-step Correction">2-step Correction</option>
                            <option value="Boats">Boats</option>
                            <option value="Motorcycle">Motorcycle</option>
                        </select> 
                      </div>
                      <div className="formGroup">
                          <label htmlFor="email">Email:</label>
                          <input type="email" name="email" placeholder="Email..." />
                      </div>
                      <div className="formGroup">
                          <label htmlFor="phone">Phone:</label>
                          <input type="text" name="phone" placeholder="Phone..." />
                      </div>
                      <div className="formGroup">
                          <label htmlFor="serviceDate">Date:</label>
                          <input type="date" name="serviceDate" onChange={e => e.target.value ? setDateSelected(true) : setDateSelected(false)}/>
                      </div>
                      <div className="formGroup">
                          {/* If date is not selected disbale select object else enable and show available dates for that date*/}
                          <label htmlFor="serviceTime">Time:</label>
                            <select name="serviceTime" id="chosenTime" disabled={!dateSelected ? "disabled" : ""}>
                              {dateSelected ? availableTimes.map((times, key) => (
                                  <option key={key} value={times.time}>{times.time}</option>
                              )): <option>(Select a date to display available times)</option>}
                            </select>
                      </div>

                      <div className="formGroup">
                          <button className="submitBtn">Schedule</button>
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
