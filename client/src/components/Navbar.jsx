//Navbar css in located in main.scss
import { useState, useEffect } from "react";
import RMLLogo from "../assets/RMLLogo.png";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMultiply } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  //State to check if scrolled away from top of page to add styling to navbar if moved
  const [scrolling, setScrolling] = useState(false);
  //State to check if navbar is collapsed or not
  const [navCollapsed, setNavCollapsed] = useState(false);
  //State of proifle menu dropdown
  const [profileDropdown, setProfileDropdown] = useState(false);

  //Use cookies to check if a user is logged in
  const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);

  const NavLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/Services" },
    { name: "Gallery", href: "/Gallery" },
    { name: "About", href: "/About" },
    /*{ name: "Schedule", href: "/Schedule" },*/
]

const RightNavLinks = [
  { name: "Login", href: "/Login" },
]
  
const ProfileMenu = [
  { name: "My Appointments", href: "/Profile/Appointments" },
  {name: "My Profile", href: "/Profile/EditProfile"},
]

  //useNavigate hook to login page on logout
  const navigate = useNavigate();

  //Effect that will handle logic for scrolling away from top of screen to add style/class to Navbar
  useEffect(() => {

        if (scrolling > 150) {
          setScrolling(window.scrollY > 150);
        }

        const handleScroll = () => {
          setScrolling(window.scrollY > 150);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
  }, [])
  
  //Effect that will handle logic for resize and checking responsive navbar when resized
  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setNavCollapsed(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  const handleNavbarCollapse = () => {
      setNavCollapsed(!navCollapsed);
  }
  
  const handleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
    console.log(profileDropdown);
  }

   //Logout function clears access token from cookies 
    //and userID from localstorge then redirects to home page
    const logout = () => {
      setCookies("access_token", "", {path: "/"})
      removeCookies("access_token")
      window.localStorage.removeItem("userID")
      navigate("/login")
  }

  return (
    <nav className={`${scrolling || navCollapsed || profileDropdown ? "scrolling" : ""}`}>
  
        <div className="logo"><a href="/"><img src={RMLLogo} alt="RML Auto Detailing" /></a></div>
        
        <button className="menuBtn" id="menuBtn"type="button" onClick={handleNavbarCollapse}>
          <FontAwesomeIcon icon={navCollapsed ? faMultiply : faBars} />
        </button>

      <ul className={`${navCollapsed ? "collapsed" : "navLinks"}`}>
          {NavLinks.map((link) => (
              <li key={link.name}><a href={link.href}>{link.name}</a></li>
          ))}
        {!cookies.access_token ?
            RightNavLinks.map((link) => (
              <li key={link.name}><a href={link.href}>{link.name}</a></li>
            ))
            :
          <li className="navProfileBtnLink">
              <button className="navProfileBtn">Profile</button>
              <div className="navProfileMenu">
                {ProfileMenu.map((link, key) => (
                  <a className="navProfileMenuLink" key={key} href={link.href}>{link.name}</a>
                ))}
                <a className="navProfileMenuLink" onClick={logout}>Logout</a>
              </div>
            </li>
        }
        </ul>


      {/* <Socials scrolling={scrolling ? "scrollingSocials" : ""} /> */}

    </nav>
  )
}

export default Navbar
