import { Navigate } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";

export const AuthRouter = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "/auth/*",
    element: <Navigate to="login" />,
  },
  {
    path: "/auth",
    element: <Navigate to="login" />,
  },
];
