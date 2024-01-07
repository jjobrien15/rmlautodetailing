import Navbar from "../components/Navbar"
import "../stylesheets/profile.scss";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useGetUserID } from "../hooks/useGetUserID"
import { Outlet, Link } from "react-router-dom"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faUser, faCar } from "@fortawesome/free-solid-svg-icons";

const profile = () => {

    //Use cookies to check if a user is logged in
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
    const [userInfo, setUserInfo] = useState({})

    //Custome hook to get user id from local storage
    const userID = useGetUserID();

    const navigate = useNavigate();

    const profileLinks = [
        { name: "My Appointments", to: "MyAppointments", icon: <FontAwesomeIcon icon={faCalendar}/> },
        { name: "My Vehicles", to: "MyVehicles", icon: <FontAwesomeIcon icon={faCar}/> },
        { name: "My Profile", to: "MyProfile", icon: <FontAwesomeIcon icon={faUser}/>},
    ]

    //Use Effect will load current user info
    useEffect(() => {
        const fetchUser = async () => {
            if (userID) {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_BASE_URI}/auth/profile/${userID}`,
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
    }, [userID])

  return (
    <div className="profile">
        <Navbar />
        <div className="profileInformation">
            <div className="profileNav">
                <ul className="profileNavLinks">
                <div className="profileNavUser">
                    <div className="profileNavUserImg">IMG</div>
                    <h3 className="profileNavUserName">{userInfo.fname} {userInfo.lname}</h3>
                </div>
                {profileLinks.map((link, key) => (
                    <li key={key}>
                        <Link className="profileNavLink" to={link.to}>
                            <div className="profileNavLinkIcon">{link.icon}</div> 
                            <div className="profileNavLinkName">{link.name}</div>
                        </Link>
                    </li>
                ))}
                </ul>
            </div>
            <div className="profileOutlet">
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default profile
