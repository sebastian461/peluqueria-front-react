import { Link } from "react-router-dom";
import "./authStyles.css";
import { useAuthStore, useForm } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";

const loginForm = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { email, password, onInputChange } = useForm(loginForm);
  const { startLogin, errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  const loginSubmit = async (event) => {
    event.preventDefault();
    await startLogin({ email, password });
  };

  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
          <Link to="/auth/register">Registrate aquí</Link>
        </div>
      </div>
    </div>
  );
};
