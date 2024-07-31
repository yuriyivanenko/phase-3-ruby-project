import React, { useEffect, useState } from "react"
import { useUser } from "../contexts/UserContext"

const TransactionTable = () => {
  const { user } = useUser()
  const [transactions, setTransactions] = useState(null)

  // useEffect(() => fetchAllTransaction(), [])

  const fetchAllTransaction = () => {
    fetch("http://localhost:9292/get_all_transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTransactions(data)
      })
      .catch((error) => console.error("Error:", error))
  }

  return (
    <div className="container">
      <button onClick={fetchAllTransaction}>Get</button>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Vendor</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions.map((t) => {
              return (
                <tr>
                  <td>{t.date}</td>
                  <td>{t.description}</td>
                  <td>{t.vendor}</td>
                  <td>{t.date}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable
