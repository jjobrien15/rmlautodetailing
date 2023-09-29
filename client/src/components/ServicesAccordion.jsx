import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const serviceArray = [
  {
    title: "Express Wash",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas quae temporibus quam reprehenderit iure, magni laborum fugit eligendi quisquam eos labore cumque deleniti praesentium, ullam enim eaque sapiente aliquid iste!",
    price: 25,
  },
  {
    title: "Premium Wash",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas quae temporibus quam reprehenderit iure, magni laborum fugit eligendi quisquam eos labore cumque deleniti praesentium, ullam enim eaque sapiente aliquid iste!",
    price: 45,
  },
  {
    title: "Deep Clean",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas quae temporibus quam reprehenderit iure, magni laborum fugit eligendi quisquam eos labore cumque deleniti praesentium, ullam enim eaque sapiente aliquid iste!",
    price: 65,
  },
  {
    title: "Boat",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas quae temporibus quam reprehenderit iure, magni laborum fugit eligendi quisquam eos labore cumque deleniti praesentium, ullam enim eaque sapiente aliquid iste!",
    price: 125,
  },
  {
    title: "Ceramic Coating",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas quae temporibus quam reprehenderit iure, magni laborum fugit eligendi quisquam eos labore cumque deleniti praesentium, ullam enim eaque sapiente aliquid iste!",
    price: 500,
  },
  {
    title: "2-step",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas quae temporibus quam reprehenderit iure, magni laborum fugit eligendi quisquam eos labore cumque deleniti praesentium, ullam enim eaque sapiente aliquid iste!",
    price: 60,
  },
]

const ServicesAccordion = () => {
  
  const [selectedAccordionCard, setSelectedAccordionCard] = useState(null);

  const showAccordionContent = (key) => {
    if (selectedAccordionCard === key) {
        setSelectedAccordionCard(null)
    } else {
      setSelectedAccordionCard(key)
    }
  }

  return (
    <div className="servicesAccordion">
      {serviceArray.map((service, key) => (
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
