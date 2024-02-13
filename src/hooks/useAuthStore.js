import { useDispatch, useSelector } from "react-redux";
import peluqueriaApi from "../api/peluqueriaApi";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await peluqueriaApi.post("/login", { email, password });
      const { user } = data.data;
      const { token } = user;

      localStorage.setItem("token-type", token.token_type);
      localStorage.setItem("token", token.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ id: user.id, name: user.name, role: user.role }));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startNewUser = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await peluqueriaApi.post("/register", {
        name,
        email,
        password,
      });
      const { user } = data.data;
      const { token } = user;

      localStorage.setItem("token-type", token.token_type);
      localStorage.setItem("token", token.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ id: user.id, name: user.name, role: user.role }));
    } catch ({ response }) {
      dispatch(onLogout(response.data.message));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await peluqueriaApi.get("/renew");
      const { user } = data.data;
      const { token } = user;

      localStorage.setItem("token", token.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ id: user.id, name: user.name, role: user.role }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = async () => {
    try {
      await peluqueriaApi.post("/logout");
      localStorage.clear();
      dispatch(onLogout());
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    user,

    //* Métodos
    checkAuthToken,
    startLogin,
    startLogout,
    startNewUser,
  };
};
