import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../contexts/UserContext"

const NavBar = () => {
  const { user, setUser } = useUser()
  const navigate = useNavigate()

  const navigateTo = (route) => navigate(route)

  console.log(user)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          BookieApp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/new_transaction" className="nav-link">
                New Transaction
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                P&L
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Vendors
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" tabIndex="-1" aria-disabled="true">
                Customers
              </a>
            </li>
            <a className="navbar-brand px-5" href="#">
              {user && `${user.business_name}`}
            </a>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
