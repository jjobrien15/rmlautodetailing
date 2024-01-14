import "../stylesheets/editProfile.scss"
import axios from "axios"

import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { useGetUserId } from "../hooks/useGetUserId.jsx"

import FormInput from "../components/FormInput"






const userProfile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["access_token"])
    const [userInfo, setUserInfo] = useState({});
    const userId = useGetUserId();

    const [formValues, setFormValues] = useState({
        fname: "",
        lname: "",
        email: "",
    })

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

     //Handle request to update user
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URI}/auth/register`, { ...formValues });
        } catch (err){
            console.log(err);
        }
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


    const inputs = [
        {
            name: "fname",
            type: "text",
            placeholder: userInfo.fname,
            label: "First Name:",
            htmlFor: "fname",
            required: true,
            errormessage: "Please enter your first name..."
        },
        {
            name: "lname",
            type: "text",
            placeholder: userInfo.lname,
            label: "Last Name:",
            htmlFor: "lname",
            required: true,
            errormessage: "Please enter your last name..."
        },
        {
            name: "email",
            type: "email",
            placeholder: userInfo.email,
            label: "Email:",
            htmlFor: "email",
            pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
            required: true,
            errormessage: "Please enter valid email address...",
        },
    ]
    
    

    return (
        <div className="edit-profile">
            <h1>Edit Profile</h1>
            <form onSubmit={onSubmit}>
                {inputs.map((input, key) => (
                    <FormInput {...input} key={key} value={formValues[input.name]} onChange={handleChange}/>
                ))}
                <div className='formGroup'>
                    <button type="submit" className='submitBtn'>Save Changes</button>
                </div>
            </form>
        </div>
    )
}

export default userProfile