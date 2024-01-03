import Navbar from "../components/Navbar"
import testImg from "../assets/galleryImages/img1.jpg"
import "../stylesheets/profile.scss";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useGetUserID } from "../hooks/useGetUserID"
import { Outlet, Link } from "react-router-dom"
import axios from "axios"

const profile = () => {

    //Use cookies to check if a user is logged in
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
    const [userInfo, setUserInfo] = useState({})

    //Custome hook to get user id from local storage
    const userID = useGetUserID();

    const navigate = useNavigate();

    const profileLinks = [
        { name: "My Appointments", to: "MyAppointments" },
        { name: "My Vehicles", to: "MyVehicles" },
        { name: "My Profile", to: "MyProfile" },
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
                <div className="profileUser">
                    <h3>{userInfo.fname} {userInfo.lname}</h3>
                </div>
                <ul className="profileNavLinks">
                {profileLinks.map((link, key) => (
                    <li key={key}><Link className="profileNavLink" to={link.to}>{link.name}</Link></li>
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
