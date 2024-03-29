import Navbar from "../components/Navbar"
import axios from "axios"

import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useGetUserId } from "../hooks/useGetUserId"
import { Outlet, Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faUser, faCar, faUserPen, faArrowRightFromBracket, faHouse, faWrench, faImage, faAddressCard } from "@fortawesome/free-solid-svg-icons";

import "../stylesheets/profile.scss";

const profile = () => {

    //Use cookies to check if a user is logged in
    const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);
    const [userInfo, setUserInfo] = useState({})

 
    //Custome hook to get user id from local storage
    const userId = useGetUserId();

    const navigate = useNavigate();

    const profileLinks = [
        { name: "My Appointments", to: "MyAppointments", icon: <FontAwesomeIcon icon={faCalendar}/> },
        { name: "My Vehicles", to: "MyVehicles", icon: <FontAwesomeIcon icon={faCar}/> },
        { name: "My Profile", to: "MyProfile", icon: <FontAwesomeIcon icon={faUserPen}/>}
    ]

    const adminLinks = [
        { name: "Home", to: "AdminHome", icon: <FontAwesomeIcon icon={faHouse}/> },
        { name: "Services", to: "AdminServices", icon: <FontAwesomeIcon icon={faWrench}/> },
        { name: "Gallery", to: "AdminGallery", icon: <FontAwesomeIcon icon={faImage}/> },
        { name: "About", to: "AdminAbout", icon: <FontAwesomeIcon icon={faAddressCard}/> },
    ]

    //Logout button
    const logout = () => {
        setCookies("access_token", "", {path: "/"})
        removeCookies("access_token")
        window.localStorage.removeItem("userId")
        navigate("/login")
    }

    //Use Effect will load current user info
    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_BASE_URI}/auth/profile/${userId}`,
                        {
                            headers: {
                                auth: cookies.access_token
                            }
                        }
                    );
                    setUserInfo(response.data);
                } catch (err) {
                    console.log(err);
                }
            } else {
                navigate("/login");
            }
        }
        fetchUser();
    }, [userId])

  return (
    <div className="profile">
        <Navbar />
        <div className="profileInformation">
            <div className="profileNav">
                <ul className="profileNavLinks">
                    <div className="profileNavUser">
                        <div className="profileNavLinkIcon profileNavUserImg"><FontAwesomeIcon icon={faUser}/></div>
                        <h3 className="profileNavLinkName profileNavUserName">{userInfo.fname} {userInfo.lname}</h3>
                    </div>
                    {profileLinks.map((link, key) => (
                            <Link className="profileNavLink" key={key} to={link.to}>
                                <div className="profileNavLinkIcon">{link.icon}</div> 
                                <div className="profileNavLinkName">{link.name}</div>
                            </Link>

                    ))}
                    <div className="adminLinks">
                    {userInfo.auth === 1 && (
                        adminLinks.map((link, key) => (
                            <Link className="profileNavLink" key={key} to={link.to}>
                                <div className="profileNavLinkIcon">{link.icon}</div> 
                                <div className="profileNavLinkName">{link.name}</div>
                            </Link>
                        ))
                    )}
                    </div>
                </ul>
                {/*<ul className="profileNavLinks adminLinks">        
                {userInfo.auth === 1 && (
                        adminLinks.map((link, key) => (
                            <Link className="profileNavLink" to={link.to}>
                                <div className="profileNavLinkIcon">{link.icon}</div> 
                                <div className="profileNavLinkName">{link.name}</div>
                            </Link>
                        ))
                    )}
                </ul>*/}
                
                <div className="profileNavLogout">
                      <button onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket}/></button>  
                </div>    
            </div>
            <div className="profileOutlet">
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default profile
