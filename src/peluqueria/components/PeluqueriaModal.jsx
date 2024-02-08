import { useMemo, useState } from "react";

import { addHours } from "date-fns";
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
    service: undefined,
    start: new Date(),
    end: addHours(new Date(), 1),
    user: {
      id: 1,
      name: "Sebastián",
    },
  });

  const titleClass = useMemo(() => {
    if (!formSubmited) return "";

    return isNaN(formValues.service) ? "is-invalid" : "is-valid";
  }, [formValues.service, formSubmited]);

  const onSelectedChange = ({ target }, changing) => {
    setFormValues({
      ...formValues,
      [changing]: target.value,
    });
  };

  const onCloseModal = () => {
    closeModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmited(true);

    if (isNaN(formValues.service)) {
      Swal.fire("Error en el servicio", "No ha marcado un servicio", "error");
      console.log("Error en el servicio");
      return;
    }

    await startSavingEvent(formValues);
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
            value={formValues.service}
            onChange={(event) => onSelectedChange(event, "service")}
          >
            <option value={null}>--Seleccionar--</option>
            {services.map((s) => (
              <option value={s.id} key={s.id}>
                {s.name} - ${s.amount}
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
