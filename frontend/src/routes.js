import Home from "./pages/Home"
import ProfitLoss from "./pages/ProfitLoss"
import NewTransaction from "./pages/Transaction"
import Settings from "./pages/Settings"

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profit&loss",
    element: <ProfitLoss />,
  },
  {
    path: "/new_transaction",
    element: <NewTransaction />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]

export default routes
