import Navbar from "../components/Navbar"
import testImg from "../assets/galleryImages/img1.jpg"
import "../stylesheets/profile.scss"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useGetUserID } from "../hooks/useGetUserID"
import { Outlet, Link } from "react-router-dom"

const profile = () => {

    //Use cookies to check if a user is logged in
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
    const [userInfo, setUserInfo] = useState({})

    //Custome hook to get user id from local storage
    const userID = useGetUserID();

    //Logout function clears access token from cookies 
    //and userID from localstorge then redirects to home page
    const logout = () => {
        setCookie("access_token", "", {path: "/"})
        removeCookie("access_token")
        window.localStorage.removeItem("userID")
        useNavigate("/Login")
    }

    //Use Effect will load current user info
    useEffect(() => {
        const fetchUser = async () => {
            if (userID) {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_BASE_URI}/auth/profile/${userID}`,
                        {
                            method: "GET",
                            headers: {
                                auth: cookies.access_token
                            }
                        }
                    );
                    const data = await response.json();
                    setUserInfo(data);
                } catch (err) {
                    console.log(err);
                }
            } else {
                return useNavigate("/login");
            }
        }
        fetchUser();
    }, [])

  return (
    <div className="banner">
          <Navbar />
          <div className="profileContent container">
              <div className="profileNav">
                  <img src={testImg} alt="Profile Image" />
                  <h3>{userInfo.fname} {userInfo.lname}</h3>
                  <ul>
                      <li><Link className="profileNavLinks" to="Appointments">Appointments</Link></li>
                      <li><Link className="profileNavLinks" to="EditProfile">Edit Profile</Link></li>
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
