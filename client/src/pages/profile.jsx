import Navbar from "../components/Navbar"
import testImg from "../assets/galleryImages/img1.jpg"
import "../stylesheets/profile.scss"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from "axios"
import { useGetUserID } from "../hooks/useGetUserID"
import { Outlet, Link } from "react-router-dom"

const profile = () => {

    //Use cookies to check if a user is logged in
    const [cookies, setCookies] = useCookies(["access_token"])
    const [userInfo, setUserInfo] = useState({})

    //useNavigate hook to redirect on logout
    const navigate = useNavigate();

    //Custome hook to get user id from local storage
    const userID = useGetUserID();

    //Logout function clears access token from cookies 
    //and userID from localstorge then redirects to home page
    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userID")
        navigate("/")
    }

    //Use Effect will load current user info
    //ISSUE: Loads when user logins in and is navigated from login page but will not load when returning to login page.
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URI}/auth/profile/${userID}`,
                    { headers: { auth: cookies.access_token } }
                );
                    setUserInfo(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, [userInfo])

  return (
    <div className="banner">
          <Navbar />
          <div className="profileContent container">
              <div className="profileNav">
                  <img src={testImg} alt="Profile Image" />
                  <h3>{userInfo.fname} {userInfo.lname}</h3>
                  <ul>
                      <li><Link className="profileNavLinks" to="UserProfile">Profile</Link></li>
                      <li><Link className="profileNavLinks" to="Appointments">Appointments</Link></li>
                      <li><a className="profileNavLinks" onClick={logout}>Logout</a></li>
                  </ul>
              </div>
              <div className="profileInformation">
                  <Outlet />
              </div>
          </div>
    </div>
  )
}

export default profile
