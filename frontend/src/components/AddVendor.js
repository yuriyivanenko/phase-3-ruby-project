import React, { useState } from "react"
import { useUser } from "../components/contexts/UserContext"

const AddVendor = ({ onCreateVendor }) => {
  const { user } = useUser()
  const [name, setName] = useState("")

  const handleInputChange = ({ target }) => setName(target.value)

  const handleSubmit = () => {
    fetch("http://localhost:9292/add_vendor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, user_id: user.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setName("")
        onCreateVendor(data)
      })
      .catch((error) => console.error("Error:", error))
  }

  return (
    <tr>
      <td>
        <input className="" type="text" value={name} onChange={handleInputChange} />
      </td>
      <td>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Add Vendor
        </button>
      </td>
    </tr>
  )
}

export default AddVendor
