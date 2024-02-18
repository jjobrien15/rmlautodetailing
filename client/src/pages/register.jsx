import { useNavigate } from "react-router-dom"
import { useState } from "react"

import Navbar from "../components/Navbar"
import FormInput from "../components/FormInput"
import axios from "axios"

import "../stylesheets/formPageStyles.scss"


const register = () => {

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    auth: 0,
    fname: "",
    lname:"",
    email: "",
    pwd: "",
    pwd2:"",
  })

  const inputs = [
    {
      name: "fname",
      type: "text",
      placeholder: "First Name...",
      label: "First Name:",
      required: true,
      errormessage: "Please enter your first name..."
    },
    {
      name: "lname",
      type: "text",
      placeholder: "Last Name...",
      label: "Last Name:",
      required: true,
      errormessage: "Please enter your last name..."
    },
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
      errormessage: "Password must be 6-20 characters and include atleast 1 number and 1 special character...",
    },
    {
      name: "pwd2",
      type: "password",
      placeholder: "Confirm Password...",
      label: "Confirm Password:",
      pattern: formValues.pwd,
      required: true,
      errormessage: "Passwords do not match!",
    },
  ]

  //Setting state for form values on each change of the value
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  //Handle API request to create new user
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
        await axios.post(`${import.meta.env.VITE_BASE_URI}/auth/register`, { ...formValues });
      } catch (err){
        console.log(err);
      }finally{
        navigate("/login");
    }

  }

  return (
    <div className='banner'>
      <Navbar />
      <div className='formPageContent'>
        <h1>Register</h1>
        <form className="resgisterForm" onSubmit={onSubmit}>
          {inputs.map((input, key) => (
            <FormInput
            {...input}
            key={key}
            value={formValues[input.name]}
            onChange={handleChange}
            />
          ))}
          <div className='formGroup'>
            <button type="submit" className='submitBtn'>Create Account</button>
          </div>
        </form>
        <p>Already have an account? <a className="formLinks" href="Login">Login</a></p>
      </div>
    </div>
  )
}

export default register
