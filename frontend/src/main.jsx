import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./style.css"

import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Error from "./pages/Error.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from './pages/SignUp.jsx'
import Simulation from './pages/Simulation.jsx'
import NavBar from './components/NavBar.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/simulation",
    element: <Simulation />
  },
  {
    element: <NavBar />
  },
  {
    path: "*",
    element: <Error />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
