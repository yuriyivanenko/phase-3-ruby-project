import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../contexts/UserContext"

const LoginForm = () => {
  const { user, setUser } = useUser()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
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
        console.log(data)
        setUser(data)
      })
      .then(navigate("/profit&loss"))
      .catch((error) => console.error("Error:", error))
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    fetchUser()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
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
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="mb-3"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm
