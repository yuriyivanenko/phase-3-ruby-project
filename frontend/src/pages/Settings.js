import { useState } from "react"
import { useUser } from "../components/contexts/UserContext"
import NavBar from "../components/NavBar"
import SettingsRow from "../components/SettingsRow"
import AddVendor from "../components/AddVendor"
import AddCustomer from "../components/AddCustomer"

function Settings() {
  const { user } = useUser()
  const [vendors, setVendors] = useState(null)
  const [customers, setCustomers] = useState(null)

  const fetchVendorsAndCustomers = () => {
    fetch("http://localhost:9292/fetch_all_vendors_and_customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setVendors(data.vendors)
        setCustomers(data.customers)
      })
      .catch((error) => console.error("Error:", error))
  }

  const handleCreateVendor = (vendor) => setVendors((prev) => [...prev, vendor])
  const handleCreateCustomer = (customer) => setCustomers((prev) => [...prev, customer])

  return (
    <>
      <NavBar />
      <div className="container text-center">
        <button onClick={fetchVendorsAndCustomers}>Get All</button>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Vendors</th>
              </tr>
            </thead>
            <tbody>
              {vendors &&
                vendors.map((vendor) => {
                  return <SettingsRow key={vendor.id} party={{ ...vendor, type: "vendor" }} />
                })}
              <AddVendor onCreateVendor={handleCreateVendor} />
            </tbody>
          </table>

          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Customers</th>
                </tr>
              </thead>
              <tbody>
                {customers &&
                  customers.map((customer) => {
                    return <SettingsRow key={customer.id} party={{ ...customer, type: "customer" }} />
                  })}
                <AddCustomer onAddCustomer={handleCreateCustomer} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
