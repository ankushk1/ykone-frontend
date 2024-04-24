import { Outlet, createBrowserRouter } from "react-router-dom";
import "./App.css";
import CreateClient from "./pages/CreateClient";
import MainPage from "./pages/MainPage";
import DetailsPage from "./pages/DetailsPage";
function App() {
  return <div></div>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <MainPage />
      }
    ]
  },
  {
    path: "/create",
    element: <CreateClient />
  },
  {
    path: "/details/:id",
    element: <DetailsPage />
  }
]);

export default App;
