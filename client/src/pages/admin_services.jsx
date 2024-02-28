import axios from "axios";
import Popup from "reactjs-popup";
import toast from "react-hot-toast";
import AdminEditService from "../components/AdminEditService";
import AdminAddService from "../components/AdminAddService";

import { useEffect, useState, useRef } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from "react-cookie"

import "../stylesheets/admin.scss";

const admin_services = () => {

  const [services, setServices] = useState([]);

  const addServiceRef = useRef();
  const closeAddService = () => addServiceRef.current.close();

  const editServiceRefs = useRef({});
  const closeEditService = (id) => editServiceRefs.current[id].close();
    
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
  }, [services]);

  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URI}/content/deleteService/${serviceId}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="adminHeader">
          <h1>Services</h1>
        <Popup className="popupSchedule" trigger={<button className="adminCreateBtn"><FontAwesomeIcon icon={faPlus} /></button>} modal nested closeOnDocumentClick={false} ref={addServiceRef}>
            <AdminAddService closeAddService={closeAddService} />
          </Popup>
      </div>
      <div className="adminCards">
        {services.map((service, key)=>(
          <div className="adminCard" key={key}>
            <div className="info">
              <h4>{service.title}</h4>
              <p>{service.description !==  undefined ? service.description : "(No Description for service)"}</p>
              <p>{service.price !== undefined ? `$${service.price}` : "No price information. Will display 'Contact for pricing'"}</p>
            </div>
            <div className="adminCardOptions">
              <Popup className="adminEdit" trigger={<button className="adminEditBtn">Edit</button>} modal nested closeOnDocumentClick={false} ref={el => editServiceRefs.current[key] = el}>
                <AdminEditService selectedService={service._id} closeEditService={() => closeEditService(key)}/>
              </Popup>
              <button className="adminCancelBtn" onClick={() => handleDeleteService(service._id)}>
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