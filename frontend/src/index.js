import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { UserProvider } from "./components/contexts/UserContext"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import routes from "./routes"

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
)
