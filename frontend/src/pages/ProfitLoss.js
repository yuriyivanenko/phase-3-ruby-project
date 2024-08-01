import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import { useUser } from "../components/contexts/UserContext"

const ProfitLoss = () => {
  const { user, setUser } = useUser()
  const [data, setData] = useState(null)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const user = savedUser ? JSON.parse(savedUser) : null
    if (user) {
      setUser(user)
    }
  }, [])

  const fetchProfitLoss = () => {
    fetch("http://localhost:9292/profitandloss", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        startDate,
        endDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
      .catch((error) => console.error("Error:", error))
  }

  const handleYTD = () => {
    fetch("http://localhost:9292/generate_YTD_PandL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setStartDate(data.start_date)
        setEndDate(data.end_date)
        console.log(data)
      })
      .catch((error) => console.error("Error:", error))
  }

  const handleMTD = () => {
    fetch("http://localhost:9292/generate_MTD_PandL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setStartDate(data.start_date)
        setEndDate(data.end_date)
        console.log(data)
      })
      .catch((error) => console.error("Error:", error))
  }

  const handleLastMonth = () => {
    fetch("http://localhost:9292/generate_last_month_PandL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setStartDate(data.start_date)
        setEndDate(data.end_date)
        console.log(data)
      })
      .catch((error) => console.error("Error:", error))
  }

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value)
  }

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value)
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
    <>
      <NavBar />
      <div className="container ">
        <h4 className="mt-3">Profit & Loss Statement</h4>
        <div className="container">
          <div className="row">
            <div className="col">
              <label>
                Start Date:
                <input type="date" className="m-2" value={startDate} onChange={handleStartDateChange} />
              </label>
              <br />
            </div>
            <div className="col">
              <label>
                End Date:
                <input type="date" className="m-2" value={endDate} onChange={handleEndDateChange} />
              </label>
            </div>
            <div className="col">
              <button className="btn btn-primary" onClick={fetchProfitLoss}>
                Generate P&L
              </button>
            </div>
          </div>
        </div>
        <div className="my-3">
          <button className="btn btn-outline-primary mx-2" onClick={handleYTD}>
            YTD P&L
          </button>
          <button className="btn btn-outline-primary mx-2" onClick={handleMTD}>
            MTD P&L
          </button>
          <button className="btn btn-outline-primary mx-2" onClick={handleLastMonth}>
            Last Month P&L
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Sales</th>
              <td>{data && `${accountingFormat(data.sales)}`}</td>
            </tr>
            <tr>
              <th scope="row">Expenses</th>
              <td>{data && `(${accountingFormat(data.purchases)})`}</td>
            </tr>
            <tr>
              <th scope="row">Net Income</th>
              <td colSpan="2">
                <b>{data && `$${accountingFormat(data.profit_or_loss)}`}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ProfitLoss
