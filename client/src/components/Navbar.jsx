//Navbar css in located in main.scss
import { useState, useEffect } from "react"
import RMLLogo from "../assets/RMLLogo.png"
import Socials from "../components/Socials"

const NavLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "Services" },
    { name: "Gallery", href: "Gallery" },
    { name: "About", href: "About" },
    { name: "Shop Vehicles", href: "Vehicles" },
]

const RightNavLinks = [
  { name: "Schedule Service", href: "Schedule" },
  { name: "Login", href: "Login" },

]

const Navbar = () => {
  //State to check if scrolled away from top of page to add styling to navbar if moved
  const [scrolling, setScrolling] = useState(false)

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

  return (
    <nav className={scrolling ? "scrolling" : ""}>
      <div className="logo"><a href="/"><img src={RMLLogo} alt="RML Auto Detailing" /></a></div>

      <ul>
        {NavLinks.map((link) => (
            <li className="navLinks" key={link.name}><a href={link.href}>{link.name}</a></li>
        ))}
      </ul>

      <ul>
        {RightNavLinks.map((link) => (
            <li className="rightNavLinks" key={link.name}><a href={link.href}>{link.name}</a></li>
        ))}
      </ul>

      {/* <Socials scrolling={scrolling ? "scrollingSocials" : ""} /> */}

    </nav>
  )
}

export default Navbar
