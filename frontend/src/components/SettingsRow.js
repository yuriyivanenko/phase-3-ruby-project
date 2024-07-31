import React, { useState } from "react"

const SettingsRow = ({ party: { name, id, user_id, type } }) => {
  const [isEditable, setIsEditable] = useState(false)
  const [nonEditName, setNonEditName] = useState(name)
  const [partyName, setPartyName] = useState(name)

  const handleEditing = () => {
    setIsEditable(!isEditable)
    // setPartyName(name)
  }

  const handleUpdateParty = () => {
    fetch("http://localhost:9292/update_vendor_or_customer", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ party_id: id, user_id, partyName, type }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setNonEditName(data.name)
        setPartyName(data.name)
        setIsEditable(false)
      })
      .catch((error) => console.error("Error:", error))
  }

  return (
    <tr>
      {isEditable ? (
        <td>
          <input className="" type="text" value={partyName} onChange={(e) => setPartyName(e.target.value)} />
          <button className="btn btn-outline-primary mx-3" onClick={handleUpdateParty}>
            💾
          </button>
        </td>
      ) : (
        <td>{nonEditName}</td>
      )}

      <td>
        <span className="m-4">
          <button className="btn btn-outline-primary" onClick={handleEditing}>
            ✏️
          </button>
        </span>
        <button className="btn btn-outline-primary">🗑️</button>
      </td>
    </tr>
  )
}

export default SettingsRow
