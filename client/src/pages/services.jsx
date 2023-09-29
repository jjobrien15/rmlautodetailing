import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../stylesheets/services.scss"
import ServicesAccordion from "../components/ServicesAccordion"

const services = () => {
  return (
    <div>
      <Navbar />
      <div className="banner servicesBanner">
        <div className="servicesBannerContent">
          <h1>Our Services</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas quae temporibus quam reprehenderit iure, magni laborum fugit eligendi quisquam eos labore cumque deleniti praesentium, ullam enim eaque sapiente aliquid iste!</p>
        </div>
      </div>
      <div className="servicesAccordionSection container">
        <h1>What We Offer</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia neque error architecto distinctio nesciunt tempore saepe reprehenderit aliquid recusandae magnam corrupti excepturi, a ad itaque laborum maiores pariatur. Iste, labore.</p>
        <ServicesAccordion />
      </div>
      <Footer />
    </div>
  )
}

export default services
