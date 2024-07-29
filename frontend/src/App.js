import "./App.css"
import { useState } from "react"

import LoginForm from "./components/LoginForm"

function App() {
  const [user, setUser] = useState(null)

  return <div className="App">{user ? `${user.business_name}` : <LoginForm setUser={setUser} />}</div>
}

export default App
