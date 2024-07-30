import Home from "./pages/Home"
import ProfitLoss from "./pages/ProfitLoss"
import NewTransaction from "./pages/NewTransaction"

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
]

export default routes
