//Socials css is located in main.scss
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'

const socialLinks = [
    { name: "Facebook", link: "https://www.facebook.com/rmlautodetailing/", icon: faFacebookF },
    { name: "Instagram", link: "https://www.instagram.com/rml_autodetailingnj/", icon: faInstagram},
]

const Socials = (props) => {
  return (
      <div className={`socials ${props.scrolling}`}>
          <div className="socialsContainer">
                    {socialLinks.map((social, key) => (
                        <a key={ key } href={social.link} target="_blank">
                            <FontAwesomeIcon icon={social.icon} />
                        </a>
                    ))}
            </div>
        </div>
  )
}

export default Socials
