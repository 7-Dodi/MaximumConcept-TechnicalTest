// **Importações
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// **Pages
import { HomePage } from "./pages/Home-Page/index.tsx";
import { RegisterPage } from "./pages/Regsiter-Page/index.tsx";
import { DashboardPage } from "./pages/Dashboard-Page/index.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register/:type",
        element: <RegisterPage />,
      },
      {
        path: "/dashboard/:type",
        element: <DashboardPage />,
      },
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
