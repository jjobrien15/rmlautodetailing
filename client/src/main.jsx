import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CookiesProvider } from 'react-cookie'
import { Toaster } from 'react-hot-toast'

import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from "./pages/home"
import Services from "./pages/services"
import About from "./pages/about"
import Gallery from "./pages/gallery"
import Vehicles from "./pages/vehicles"
import Login from "./pages/login"
import Schedule from './pages/schedule'
import Register from "./pages/register"
import Profile from "./pages/profile"
import Appointments from "./pages/appointments"
import EditProfile from "./pages/edit-profile"
import ErrorPage from "./pages/error-page"
import AdminHome from "./pages/admin_home"
import AdminServices from "./pages/admin_services"
import AdminGallery from "./pages/admin_gallery"
import AdminAbout from "./pages/admin_about"

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
          path: "MyProfile",
          element: <EditProfile />,
        },
        {
          path: "MyAppointments",
          element:<Appointments />,
        },
        {
          path: "MyVehicles",
          element:<Vehicles />,
        },
        {
          path: "MySchedule",
          element: <Schedule />,
        },
        {
          path: "AdminHome",
          element: <AdminHome />
        },
        {
          path: "AdminServices",
          element: <AdminServices />
        },
        {
          path: "AdminGallery",
          element: <AdminGallery />
        },
        {
          path: "AdminAbout",
          element: <AdminAbout />
        },
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-right"/>
    </CookiesProvider>
  </React.StrictMode>,
)
