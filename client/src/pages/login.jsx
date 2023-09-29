import Navbar from "../components/Navbar"
import FormInput from "../components/FormInput"
import "../stylesheets/formPageStyles.scss"
import { useState } from "react"

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
  
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  return (
      <div className="banner">
        <Navbar />
        <div className="formPageContent">
          <h1>Login</h1>
              <form onSubmit={handleSubmit}>
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
