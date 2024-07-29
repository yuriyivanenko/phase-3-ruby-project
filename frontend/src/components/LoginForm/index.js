import React, { useState } from "react"

const LoginForm = ({ setUser }) => {
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
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
