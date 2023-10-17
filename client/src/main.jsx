import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CookiesProvider } from 'react-cookie'
import Home from "./pages/home"
import Services from "./pages/services.jsx"
import About from "./pages/about.jsx"
import Gallery from "./pages/gallery.jsx"
import Vehicles from "./pages/vehicles.jsx"
import Login from "./pages/login.jsx"
import Schedule from './pages/schedule.jsx'
import Register from "./pages/register.jsx"
import Profile from "./pages/profile.jsx"
import Appointments from "./pages/appointments.jsx"
import UserProfile from "./pages/userProfile.jsx"
import ErrorPage from "./pages/error-page.jsx"
import { Navigate } from 'react-router-dom'
import "./stylesheets/main.scss"


const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Services",
    element: <Services />,
  },
  {
    path: "/Gallery",
    element: <Gallery />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Vehicles",
    element: <Vehicles />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Profile",
    element:<Profile />,
    children: [
        {
          index: true,
          path: "UserProfile",
          element:<UserProfile />,
        },
        {
          path: "Appointments",
          element:<Appointments />,
        },
    ]
  },
  {
    path: "/Schedule",
    element: <Schedule />,
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>,
)
