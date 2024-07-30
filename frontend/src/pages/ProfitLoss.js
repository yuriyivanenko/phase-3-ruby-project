import NavBar from "../components/NavBar"
import { useUser } from "../components/contexts/UserContext"

const ProfitLoss = () => {
  const { user, setUser } = useUser()
  console.log(user)
  return (
    <>
      <NavBar />
      <div className="container ">
        <h4 className="mt-3">Profit & Loss Statement</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Sales</th>
              <td>Mark</td>
            </tr>
            <tr>
              <th scope="row">Expenses</th>
              <td>Jacob</td>
            </tr>
            <tr>
              <th scope="row">Net Income</th>
              <td colSpan="2">Larry the Bird</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ProfitLoss
