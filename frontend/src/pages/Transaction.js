import { useEffect, useState } from "react"
import { useUser } from "../components/contexts/UserContext"
import NavBar from "../components/NavBar"
import SalesTable from "../components/SalesTable"
import PurchasesTable from "../components/PurchasesTable"

const Transaction = () => {
  const { user, setUser } = useUser()
  const [transactionType, setTransactionType] = useState("Sale")
  const [showTables, setShowTables] = useState(false)
  const [showSales, setShowSales] = useState(false)
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [party, setParty] = useState("")
  const [parties, setParties] = useState({
    Sale: [],
    Expense: [],
  })

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const user = savedUser ? JSON.parse(savedUser) : null
    if (user) {
      setUser(user)
    }
  }, [])

  useEffect(() => {
    fetchVendorOrCustomer(transactionType)
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      userId: user.id,
      transactionType,
      date,
      description,
      amount: parseFloat(amount),
      party: parseFloat(party),
    }
    postRequest(data)
  }

  const postRequest = (data) => {
    fetch("http://localhost:9292/new_transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((_data) => {
        setDescription("")
        setAmount("")
      })
      .catch((error) => console.error("Error:", error))
  }

  const handleChangeTransactionType = (e) => {
    setTransactionType(e.target.value)
    fetchVendorOrCustomer(e.target.value)
  }

  const fetchVendorOrCustomer = (transactionType) => {
    fetch("http://localhost:9292/query_vendor_or_customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user, transactionType }),
    })
      .then((res) => res.json())
      .then((data) => {
        updateParties(data, transactionType)
      })
      .catch((error) => console.error("Error:", error))
  }

  const updateParties = (data, transactionType) => {
    setParties((prevParties) => ({
      ...prevParties,
      [transactionType]: data,
    }))
    setParty(data[0].id)
  }

  const showPurchasesTable = () => {
    setShowTables(true)
    setShowSales(false)
  }
  const showSalesTable = () => {
    setShowTables(true)
    setShowSales(true)
  }

  return (
    <>
      <NavBar />
      <div className="container text-center w-50">
        <h3 className="my-3"> New Transaction</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Type
            </label>
            <select
              className="form-select"
              id="inputGroupSelect01"
              onChange={handleChangeTransactionType}
              value={transactionType}
            >
              <option value="Sale">Sale</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Date:</label>
            <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">{transactionType === "Sale" ? "Customer" : "Vendor"}:</label>
            <select required className="form-select" value={party} onChange={(e) => setParty(e.target.value)}>
              {parties[transactionType].map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">Description:</label>
            <input
              required
              className="form-control"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">Amount ($):</label>
            <input
              required
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="container">
        <button className="btn btn-success m-3" onClick={showSalesTable}>
          All Sales
        </button>
        <button className="btn btn-danger m-3" onClick={showPurchasesTable}>
          All Purschases
        </button>
      </div>
      {showTables && showSales ? <SalesTable /> : null}
      {showTables && !showSales ? <PurchasesTable /> : null}
    </>
  )
}

export default Transaction
