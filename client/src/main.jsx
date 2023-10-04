import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/home"
import Services from "./pages/services"
import About from "./pages/about"
import Gallery from "./pages/gallery"
import Vehicles from "./pages/vehicles"
import Login from "./pages/login"
import Schedule from './pages/schedule'
import Register from "./pages/register"
import Profile from "./pages/profile"
import ErrorPage from "./pages/error-page"
import "./stylesheets/main.scss"


const router = createBrowserRouter([
  {
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
    element: <Profile />,
  },
  {
    path: "/Schedule",
    element: <Schedule />,
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
