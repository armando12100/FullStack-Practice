import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/Update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Books />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/update/:id",
    element: <Update />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
