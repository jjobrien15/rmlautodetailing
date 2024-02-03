import { useState } from "react"
import { useGetUserId } from "../hooks/useGetUserId"

import axios from "axios"

import "../stylesheets/formPageStyles.scss"


const addVehicle = () => {

 //Custome hook to get user id from local storage
 const userId = useGetUserId();

 //state for details of appointment. Changes using handleChange function
 const [vehicle, setVehicle] = useState({
     clientId: userId,
     name: "",
     make: "",
     model: "",
     year: "",
     color: "",
     details:"",
 })

 //used to set state of each input field based on name of input
 const handleChange = async (e) => {
     const { name, value } = e.target;
     setVehicle({ ...vehicle, [name]: value });
 }
 //Hanldes submitting form and creating/saving information in DB
 const handleSubmit = async (e) => {
     try {
         await axios.post(`${import.meta.env.VITE_BASE_URI}/profile/createVehicle`, { ...vehicle })
         useNavigate("/Profile/MyVehicles");
     } catch (err) {
         console.log(err);
     }
 }

  return (
    <div>
        <div className="formPageContent">
                <h1>Add Vehicle</h1>
        <form onSubmit={handleSubmit}>
            <div className="formGroup">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name"  onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="make">Make:</label>
                <input type="text" name="make" id="make"  onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="model">Model:</label>
                <input type="text" name="model" id="model" onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="year">Year:</label>
                <input type="number" name="year" id="year" onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="color">Color:</label>
                <input type="text" name="color" id="color" onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="details">Details:</label>
                <input type="text" name="details" id="details" onChange={handleChange}/>
            </div>

            <div className="formGroup">
                <button className="submitBtn" type="submit">Add Vehicle</button>
            </div>
        </form>
            <p>Need to review or edit an already added vehicle? <a className="formLinks" href="MyVehicles">View Vehicles</a></p>
        </div>
    </div>
  )
}

export default addVehicle
