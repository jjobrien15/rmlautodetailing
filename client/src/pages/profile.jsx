import Navbar from "../components/Navbar"
import testImg from "../assets/galleryImages/img1.jpg"
import "../stylesheets/profile.scss"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import axios from "axios"
import { useGetUserID } from "../hooks/useGetUserID"
import "dotenv/config";

const profile = () => {

    //Use cookies to check if a user is logged in
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [userInfo, setUserInfo] = useState({})

    //useNavigate hook to redirect on logout
    const navigate = useNavigate();

    //Custome hook to get user id from local storage
    const userID = useGetUserID();

    //Use Effect will load current user info
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.BASE_URI}/auth/profile/${userID}`,
                    { headers: { auth: cookies.access_token } }
                );
                    setUserInfo(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, [])

    //Logout function clears access token from cookies 
    //and userID from localstorge then redirects to home page
    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userID")
        navigate("/")
    }

  return (
    <div className="banner">
          <Navbar />
          <div className="profileContent container">
              <div className="profileNav">
                  <img src={testImg} alt="Profile Image" />
                  <h3>{userInfo.fname} {userInfo.lname}</h3>
                  <ul>
                      <li><a href="#">Profile</a></li>
                      <li><a href="#">Appointments</a></li>
                      <li><a onClick={logout}>Logout</a></li>
                  </ul>
              </div>
              <div className="profileInformation">
                  
              </div>
              <div className="profileAppointments">
                  
              </div>
          </div>
    </div>
  )
}

export default profile
