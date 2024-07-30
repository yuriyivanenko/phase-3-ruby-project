import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { UserProvider } from "./components/contexts/UserContext"

import LoginForm from "./components/LoginForm"
import NavBar from "./components/NavBar"

function App() {
  // const [user, setUser] = useState(null)

  return (
    <UserProvider>
      <NavBar />
      {/* <div className="App">{user ? null : <LoginForm setUser={setUser} />}</div> */}
      <LoginForm />
    </UserProvider>
  )
}

export default App
