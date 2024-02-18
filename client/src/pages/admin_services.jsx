import axios from "axios";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";
import AdminEditService from "../components/AdminEditService";
import AdminAddService from "../components/AdminAddService";

import { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from "react-cookie"

import "../stylesheets/admin.scss";

const admin_services = () => {

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices  = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URI}/content/services`);
        setServices(response.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchServices();
  }, []);

  return (
    <div>
      <div className="adminHeader">
          <h1>Services</h1>
          <Popup className="popupSchedule" trigger={<button className="adminCreateBtn">Add Service <FontAwesomeIcon icon={faPlus} /></button> }modal nested>
            <AdminAddService />
          </Popup>
      </div>
      <div className="adminCards">
        {services.map((service, key)=>(
          <div className="adminCard" key={key}>
            <div className="info">
              <h4>{service.title}</h4>
              <p>{service.description}</p>
              <p>{`$${service.price}`}</p>
            </div>
            <div className="adminCardOptions">
              <Popup className="adminEdit" trigger={<button className="adminEditBtn">Edit</button>} modal nested>
                <AdminEditService selectedService={service} />
              </Popup>
              <button className="adminCancelBtn" onClick={() => handleDeleteAppointment(apptInfo)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default admin_services