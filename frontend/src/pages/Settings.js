import { useEffect, useState } from "react"
import { useUser } from "../components/contexts/UserContext"
import NavBar from "../components/NavBar"
import SettingsRow from "../components/SettingsRow"
import AddVendor from "../components/AddVendor"
import AddCustomer from "../components/AddCustomer"

function Settings() {
  const { user } = useUser()
  const [vendors, setVendors] = useState(null)
  const [customers, setCustomers] = useState(null)

  useEffect(() => fetchVendorsAndCustomers(), [])

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
        setVendors(data.vendors)
        setCustomers(data.customers)
      })
      .catch((error) => console.error("Error:", error))
  }

  const handleCreateVendor = (vendor) => setVendors((prev) => [...prev, vendor])
  const handleCreateCustomer = (customer) => setCustomers((prev) => [...prev, customer])

  const handleUpdateParty = (data) => {
    if (data.type === "vendor") {
      const updatedVendors = vendors.map((vendor) => {
        if (vendor.id === data.party.id) {
          return { ...vendor, name: data.party.name }
        }
        return vendor
      })
      setVendors(updatedVendors)
    } else {
      const updatedCustomers = customers.map((customer) => {
        if (customer.id === data.party.id) {
          return { ...customer, name: data.party.name }
        }
        return customer
      })
      setCustomers(updatedCustomers)
    }
  }

  const handleDeleteParty = (data) => {
    if (data.type === "vendor") {
      const filteredVendors = vendors.filter((vendor) => vendor.id !== data.party.id)
      setVendors(filteredVendors)
    } else {
      const filteredCustomers = customers.filter((customer) => customer.id !== data.party.id)
      setCustomers(filteredCustomers)
    }
  }

  return (
    <>
      <NavBar />
      <div className="container text-center">
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
                  return (
                    <SettingsRow
                      key={vendor.id}
                      onChangeParty={handleUpdateParty}
                      onDeleteParty={handleDeleteParty}
                      party={{ ...vendor, type: "vendor" }}
                    />
                  )
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
                    return (
                      <SettingsRow
                        key={customer.id}
                        onChangeParty={handleUpdateParty}
                        onDeleteParty={handleDeleteParty}
                        party={{ ...customer, type: "customer" }}
                      />
                    )
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
