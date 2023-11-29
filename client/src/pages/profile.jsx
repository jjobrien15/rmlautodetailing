import Navbar from "../components/Navbar"
import testImg from "../assets/galleryImages/img1.jpg"
import "../stylesheets/profile.scss";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useGetUserID } from "../hooks/useGetUserID"
import { Outlet, Link } from "react-router-dom"
import axios from "axios"
import appointments from "./appointments";

const profile = () => {

    //Use cookies to check if a user is logged in
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
    const [userInfo, setUserInfo] = useState({})

    //Custome hook to get user id from local storage
    const userID = useGetUserID();

    const navigate = useNavigate();

     //Logout function clears access token from cookies 
    //and userID from localstorge then redirects to home page
    const logout = () => {
        setCookie("access_token", "", {path: "/"})
        removeCookie("access_token")
        window.localStorage.removeItem("userID")
        navigate("/login")
    }

    const profileLinks = [
        { name: "Appointments", to: "Appointments" },
        { name: "Schedule Appointment", to: "Schedule" },
        { name: "Edit Profile", to: "EditProfile" },
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
            <div className="profileContent">
                <div className="profileHeader">
                    <div className="profileNavUserInfo">
                        <img src={testImg} alt="Profile Image" />
                        <h3>{userInfo.fname} {userInfo.lname}</h3>
                    </div>
                    <a className="profileLogout" onClick={logout}>Logout</a>
                </div>
                <div className="profileInformation">
                  <ul className="profileNav">
                      {profileLinks.map((link, key) => (
                          <li key={key}><Link className="profileNavLinks" to={link.to}>{link.name}</Link></li>
                      ))}
                    </ul>
                    <div className="profileOutlet">
                        <Outlet />
                    </div>
                </div>
            </div>
    </div>
  )
}

export default profile
