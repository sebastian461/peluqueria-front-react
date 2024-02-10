import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { PeluqueriaRouter } from "./PeluqueriaRouter";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

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

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  const routes =
    status === "authenticated"
      ? [...authenticatedRoutes]
      : [...notAuthenticatedRoutes];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
