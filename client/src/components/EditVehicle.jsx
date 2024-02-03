import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import toast from 'react-hot-toast';


const EditVehicle = ({ vehicleInfo }) => {

    //state for details of appointment. Changes using handleChange function
    const [vehicle, setVehicle] = useState({
        vehicleId: vehicleInfo._id,
        name: vehicleInfo.name,
        make: vehicleInfo.make,
        model: vehicleInfo.model,
        year: vehicleInfo.year,
        color: vehicleInfo.color,
        details: vehicleInfo.details,
    })

    //used to set state of each input field based on name of input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle({ ...vehicle, [name]: value });
    }
    //Hanldes submitting form and creating/saving information in DB
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URI}/Profile/editVehicle`, { ...vehicle });
            toast.success(response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div>
       <div className="formPageContent">
            <h1>Edit Vehicle</h1>
        <form onSubmit={handleSubmit}>
            <div className="formGroup">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" value={vehicle.name} onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="make">Make:</label>
                <input type="text" name="make" id="make" value={vehicle.make} onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="model">Model:</label>
                <input type="text" name="model" id="model" value={vehicle.model} onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="year">Year:</label>
                <input type="number" name="year" id="year" value={vehicle.year} onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="color">Color:</label>
                <input type="text" name="color" id="color" value={vehicle.color} onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="details">Details:</label>
                <input type="text" name="details" id="details" value={vehicle.details} onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <button className="submitBtn" type="submit">Edit Vehicle</button>
            </div>
        </form>
        <p>Need to review or edit an already added vehicle? <a className="formLinks" href="MyVehicles">View Vehicles</a></p>
    </div>
    </div>
  )
}

export default EditVehicle
