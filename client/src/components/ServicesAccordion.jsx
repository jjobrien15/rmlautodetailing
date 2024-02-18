import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

const ServicesAccordion = () => {
  
  const [selectedAccordionCard, setSelectedAccordionCard] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URI}/content/services`);
        setServices(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchServices();
  }, []);

  const showAccordionContent = (key) => {
    if (selectedAccordionCard === key) {
        setSelectedAccordionCard(null)
    } else {
      setSelectedAccordionCard(key)
    }
  }

  return (
    <div className="servicesAccordion">
      {services.map((service, key) => (
            <div key={ key } className={`service ${selectedAccordionCard === key ? "serviceClicked" : ""}`}>
              <div className="serviceTitle" onClick={() => showAccordionContent(key)}>
                      <h4>{service.title}</h4>
                      <span className={`serviceExpandChevron ${selectedAccordionCard === key ? "rotateChevron" : ""}`}>
                        <FontAwesomeIcon icon={faChevronDown} />
                      </span>
              </div>
              <div className={`serviceDescription ${selectedAccordionCard === key ? "showServiceDescription" : "hideServiceDescription"}`}>
                <p>{service.description}</p>
            <p className='servicePrice'>Starting at <span className="colorServicePrice">${service.price}</span></p>
              </div>
            </div>
        ))}
    </div>
  )
}

export default ServicesAccordion
