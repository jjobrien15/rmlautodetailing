//Footer css in located in main.scss
import RMLLogo from "../assets/RMLLogo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const socialLinks = [
  { name: "Facebook", link: "https://www.facebook.com/rmlautodetailing/", icon: faFacebookF },
  { name: "Instagram", link: "https://www.instagram.com/rml_autodetailingnj/", icon: faInstagram},
]

const contactInfo = [
  { info: "7326145691", link: "tel:7326145691", icon: faPhone },
  { info: "jjobrien15@gmail.com", link: "mailto:jjobrien15@gmail.com", icon: faEnvelope },
]

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContent container">
        <div className="footerAbout">
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure odit itaque reprehenderit repellendus ad tenetur laboriosam maiores debitis sint alias, quibusdam necessitatibus saepe accusantium? Nisi et velit ut pariatur consequatur.</p>
          <div className="footerSocials">
              {socialLinks.map((social, key) => (
                  <a key={ key } href={social.link} target="_blank">
                      <FontAwesomeIcon icon={social.icon} />
                  </a>
              ))}
          </div>
        </div>
        <div className="footerContact">
          <div className="footerContactMessage">
            <h3>Contact Us</h3>
            <p>Reach out with questions via your preferred contact method below!</p>
          </div>
          <div className="footerContactInfo">
              {contactInfo.map((contact, key) => (
                  <a key={ key } href={contact.link} target="_blank">
                  <FontAwesomeIcon icon={contact.icon} className="contactInfoIcon"/> : { contact.info }
                  </a>
              ))}
          </div>
        </div>
      </div>
      <div className="footerLogo"><a href="/"><img src={RMLLogo} alt="RML Auto Detailing" /></a></div>
    </div>
  )
}

export default Footer
