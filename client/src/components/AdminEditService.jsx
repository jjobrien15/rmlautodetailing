import { useState } from "react";

import "../stylesheets/formPageStyles.scss"

const AdminEditService = ({selectedService}) => {

    const [service, setService] = useState({
        title: selectedService.title,
        description: selectedService.description
    });

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("submitted");
    }

//used to set state of each input field based on name of input
 const handleChange = async (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
}

  return (
    <div className="formPageContent">
        <h1>Edit Service</h1>
        <form onSubmit={handleSubmit}>
            <div className="formGroup">
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" id="title"  onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" id="description"  onChange={handleChange}/>
            </div>
            <div className="formGroup">
                <button className="submitBtn" type="submit">Save</button>
            </div>
        </form>
    </div>
  )
}

export default AdminEditService