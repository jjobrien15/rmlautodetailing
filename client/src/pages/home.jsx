import Navbar from "../components/Navbar"
import ServiceCards from "../components/ServiceCards"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"
import "../stylesheets/home.scss"

const home = () => {

  return (
    <div>
      <Navbar />
      <div className="banner homeBanner">
        <div className="homeBannerContent">
            <h1>Welcome to RML Auto Detailing</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eligendi molestias quasi blanditiis ab, adipisci magni quaerat?
              Voluptate dignissimos harum consectetur dolor possimus tenetur
              fuga corporis vitae. Commodi mollitia dolore placeat.</p>
            <div>
              <a className="callToActionBtn" href="/Profile/MyAppointments">Schedule Service</a>
            </div>
        </div>
      </div>
      <ServiceCards />
      <Testimonials />
      <Footer />

    </div>
  )
}

export default home