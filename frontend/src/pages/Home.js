import "bootstrap/dist/css/bootstrap.min.css"
import { UserProvider } from "../components/contexts/UserContext"

import LoginForm from "../components/LoginForm"
import NavBar from "../components/NavBar"

function App() {
  return (
    <UserProvider>
      <NavBar />
      <div className="container text-center">
        <LoginForm />
      </div>
    </UserProvider>
  )
}

export default App
