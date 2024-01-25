import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

import Navbar from "../components/Navbar"
import FormInput from "../components/FormInput"
import axios from "axios"

import "../stylesheets/formPageStyles.scss"

const Login = () => {

  const [formValues, setFormValues] = useState({
    email: "",
    pwd:"",
  })

  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Email...",
      label: "Email:",
      pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
      required: true,
      errormessage: "Please enter valid email address...",
      
    },
    {
      name: "pwd",
      type: "password",
      placeholder: "Password...",
      label: "Password:",
      required: true,
      errormessage: "Please enter a password...",
    },
  ]

  //Setting state for form values on each change of the value
  const handleChange = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  const [errorMessage, setErrorMessage] = useState("");

  //Used to set cookes when user logs in successfully
  const [cookies, setCookies] = useCookies(["access_token"])

  //useNavigate hook to navigate user after login
  const navigate = useNavigate()
  
  //Attempting to validate user and login
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URI}/auth/login`, { ...formValues });
      if(!response.data.message){
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userId", response.data.userId);
        navigate("/Profile/MyAppointments");
      }else{
        setErrorMessage(response.data.message);
      }

    } catch (err){
      console.log(err);
    }
  }

  //building form with formInput component
  return (
      <div className="banner">
        <Navbar />
        <div className="formPageContent">
          <h1>Login</h1>
              <form onSubmit={onSubmit}>
                <span className="errorMessage">{errorMessage}</span>
              {inputs.map((input, key) => (
                <FormInput
                  {...input}
                  key={key}
                  value={formValues[input.name]}
                  onChange={handleChange} />
              ))}
                <div className="formGroup">
                  <button type="submit" className="submitBtn">Login</button>
                </div>
              </form>
              <p>Don't have an account? <a className="formLinks" href="Register">Create Account</a></p>
              <p>Forgot Username? <a className="formLinks" href="">Recover Username</a></p>
              <p>Forgot Password? <a className="formLinks" href="">Change Password</a></p>
              
        </div>
    </div>
  )
}

export default Login
