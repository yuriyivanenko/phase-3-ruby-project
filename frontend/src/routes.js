import Home from "./pages/Home"
import ProfitLoss from "./pages/ProfitLoss"

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profit&loss",
    element: <ProfitLoss />,
  },
]

export default routes
