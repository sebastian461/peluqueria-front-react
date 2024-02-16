import { useMemo, useState } from "react";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Modal from "react-modal";

import { usePeluqueriaStore, useUiStore } from "../../hooks";
import { customStyles } from "../../helpers";

Modal.setAppElement("#root");

export const PeluqueriaModal = () => {
  const { services, startSavingEvent } = usePeluqueriaStore();
  const { isEventModalOpen, closeModal } = useUiStore();
  const [formSubmited, setFormSubmited] = useState(false);

  const [formValues, setFormValues] = useState({
    id: undefined,
  });

  const titleClass = useMemo(() => {
    if (!formSubmited) return "";

    return isNaN(formValues.id) ? "is-invalid" : "is-valid";
  }, [formValues.id, formSubmited]);

  const onSelectedChange = ({ target }, changing) => {
    setFormValues({
      ...formValues,
      [changing]: target.value,
    });
  };

  const onCloseModal = () => {
    closeModal();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);

    if (isNaN(formValues.id)) {
      Swal.fire("Error en el servicio", "No ha marcado un servicio", "error");
      console.log("Error en el servicio");
      return;
    }

    startSavingEvent(formValues.id);
    closeModal();
  };

  return (
    <Modal
      isOpen={isEventModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Servicios</label>
          <select
            className={`form-select ${titleClass}`}
            value={formValues.id}
            onChange={(event) => onSelectedChange(event, "id")}
            name="id"
          >
            <option value={null}>--Seleccionar--</option>
            {services.map((s) => (
              <option value={s.id} key={s.id}>
                {s.title} - ${s.amount}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
