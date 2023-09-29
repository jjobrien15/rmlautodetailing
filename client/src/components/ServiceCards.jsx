import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faTruck, faMotorcycle, faShip } from '@fortawesome/free-solid-svg-icons'
 

const services =[
    {
        icon: faCar,
        title: "Auto Detailing",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, nihil, aspernatur cupiditate aut quis facere temporibus a sint molestias minima nesciunt ducimus culpa itaque veniam iure quam, magni omnis! Et!",
    },
    {
        icon: faTruck,
        title: "Fleet Detailing",
        description: "Aut quis facere temporibus a sint molestias minima nesciunt ducimus culpa itaque veniam iure quam, magni omnis! Et!",
    },
    {
        icon: faMotorcycle,
        title: "Other stuff",
        description: "Consectetur adipisicing elit. Autem, nihil, aspernatur cupiditate aut quis facere temporibus a sint molestias minima nesciunt ducimus culpa itaque veniam iure quam, magni omnis! Et!",
    },
    {
        icon: faShip,
        title: "Boats",
        description: "Autem, nihil, aspernatur cupiditate aut quis facere temporibus a sint molestias minima nesciunt ducimus culpa itaque veniam iure quam, magni omnis! Et!",
    },
]


const ServiceCards = () => {
  return (
      <div className="homeServices container">  
        <h1>Our Services</h1>
        <div className="serviceCards">
              {services.map((service, index) => (
                    <div key={index} className="serviceCard">
                        <div>
                            <FontAwesomeIcon icon={service.icon} className="serviceIcon" />
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                        <button className="callToActionBtn" href="#">Learn More</button>
              </div>
              ))}
        </div>
    </div>
  )
}

export default ServiceCards
