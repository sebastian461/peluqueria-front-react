import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { PeluqueriaRouter } from "./PeluqueriaRouter";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
import { CheckingAuth } from "../ui/components/CheckingAuth";

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

const checking = [
  {
    path: "*",
    element: <CheckingAuth />,
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
      : status === "checking"
      ? [...checking]
      : [...notAuthenticatedRoutes];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
