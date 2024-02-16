import { Link } from "react-router-dom";
import "./authStyles.css";
import { useAuthStore, useForm } from "../../hooks";
import Swal from "sweetalert2";
import { useEffect } from "react";

const registerForm = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

export const RegisterPage = () => {
  const { startNewUser, errorMessage } = useAuthStore();
  const { name, email, password, password2, onInputChange } =
    useForm(registerForm);

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  const registerSubmit = async (event) => {
    event.preventDefault();

    if (password !== password2) {
      Swal.fire("Error en registro", "Las contraseñas no coinciden", "error");
      return;
    }

    await startNewUser({ name, email, password });
  };

  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="name"
                value={name}
                onChange={onInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
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

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="password2"
                value={password2}
                onChange={onInputChange}
              />
            </div>

            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
          <Link to="/auth/login" style={{ color: "white" }}>
            ¿Ya tienes cuenta?
          </Link>
        </div>
      </div>
    </div>
  );
};
