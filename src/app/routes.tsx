import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import PortalPage from "./pages/PortalPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/portal",
    Component: PortalPage,
  },
  {
    path: "*",
    Component: HomePage,
  },
]);
