import React, { useEffect, useState } from "react"
import { useUser } from "../components/contexts/UserContext"

const PurchasesTable = () => {
  const { user } = useUser()
  const [transactions, setTransactions] = useState(null)

  useEffect(() => fetchAllTransaction(), [])

  const fetchAllTransaction = () => {
    fetch("http://localhost:9292/get_all_purchases_transactions", {
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

  const accountingFormat = (value, locale = "en-US") => {
    const formatter = new Intl.NumberFormat(locale, {
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formatter.format(value)
  }

  return (
    <div className="container">
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
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.description}</td>
                  <td>{t.vendor.name}</td>
                  <td>{accountingFormat(t.amount)}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default PurchasesTable
