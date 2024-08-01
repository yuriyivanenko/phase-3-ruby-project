import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../contexts/UserContext"

const LoginForm = () => {
  const { setUser } = useUser()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const [signupData, setSignupData] = useState({
    businessName: "",
    username: "",
    password: "",
  })

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const user = savedUser ? JSON.parse(savedUser) : null
    if (user) {
      setUser(user)
      navigate("/profit&loss")
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSignupChange = (e) => {
    const { name, value } = e.target
    setSignupData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const fetchUser = () => {
    fetch("http://localhost:9292/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data)
        localStorage.setItem("user", JSON.stringify(data))
      })
      .then(navigate("/profit&loss"))
      .catch((error) => console.error("Error:", error))
  }
  const handleLogin = (e) => {
    e.preventDefault()
    fetchUser()
  }

  const handleSignup = (e) => {
    e.preventDefault()
    fetch("http://localhost:9292/sign_up_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data)
        localStorage.setItem("user", JSON.stringify(data))
        setSignupData({
          businessName: "",
          username: "",
          password: "",
        })
      })
      .then(navigate("/new_transaction"))
      .catch((error) => console.error("Error:", error))
  }

  return (
    <>
      <h3 className="mt-3">Login</h3>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username" className="mx-3">
            Username:
          </label>
          <input
            type="text"
            className="my-3"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="mx-3">
            Password:
          </label>
          <input
            type="password"
            className="mb-3"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary mb-5" type="submit">
          Login
        </button>
      </form>
      <hr></hr>
      <h3 className="mt-5">Sign Up</h3>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="businessName" className="mx-3">
            Enter a business name:
          </label>
          <input
            type="text"
            className="my-3"
            id="businessName"
            name="businessName"
            value={signupData.businessName}
            onChange={handleSignupChange}
          />
        </div>
        <div>
          <label htmlFor="username" className="mx-3">
            Enter a username:
          </label>
          <input
            type="text"
            className="my-3"
            id="username"
            name="username"
            value={signupData.username}
            onChange={handleSignupChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="mx-3">
            Enter a password:
          </label>
          <input
            type="password"
            className="mb-3"
            id="password"
            name="password"
            value={signupData.password}
            onChange={handleSignupChange}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Sign Up
        </button>
      </form>
    </>
  )
}

export default LoginForm
