import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { PeluqueriaRouter } from "./PeluqueriaRouter";

const notAuthenticatedRoutes = [
  {
    path: "auth",
    children: AuthRouter,
  },
  {
    path: "/*",
    element: <Navigate to="auth" />,
  },
];

const authenticatedRoutes = [
  {
    path: "/",
    children: PeluqueriaRouter,
  },
  {
    path: "/*",
    element: <Navigate to="/" />,
  },
];

const status = false;

export const AppRouter = () => {
  const routes = !status
    ? [...notAuthenticatedRoutes]
    : [...authenticatedRoutes];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
