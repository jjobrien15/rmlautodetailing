import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/useGetUserId";

import FormInput from "../components/FormInput";
import toast from "react-hot-toast";
import axios from "axios"

import "../stylesheets/editProfile.scss"


const editUserProfile = () => {
    const userId = useGetUserId();

    const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
    const [userInfo, setUserInfo] = useState({});
    const [formValues, setFormValues] = useState({
        userId: userId,
        fname: userInfo.fname,
        lname: userInfo.lname,
        email: userInfo.email,
    })

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
    


    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

     //Handle request to update user
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URI}/profile/updateUser`, { ...formValues });
            if (!response.data.error) {
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (err) {
            console.log(err);
        }
    }


    const inputs = [
        {
            name: "fname",
            type: "text",
            defaultValue: userInfo.fname,
            label: "First Name:",
            htmlFor: "fname",
            required: true,
            errormessage: "Please enter your first name..."
        },
        {
            name: "lname",
            type: "text",
            defaultValue: userInfo.lname,
            label: "Last Name:",
            htmlFor: "lname",
            required: true,
            errormessage: "Please enter your last name..."
        },
        {
            name: "email",
            type: "email",
            defaultValue: userInfo.email,
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
                    <FormInput {...input} key={key} onChange={handleChange} />
                ))}
                <div className='formGroup'>
                    <button type="submit" className='submitBtn'>Save Changes</button>
                </div>
            </form>
        </div>
    )
}

export default editUserProfile