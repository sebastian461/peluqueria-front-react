import Modal from "react-modal";
import { usePeluqueriaStore, useUiStore } from "../../hooks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { customStyles } from "../../helpers";

Modal.setAppElement("#root");

export const PeluqueriaServiceModal = () => {
  const { services, setActiveService, activeService, startDeletingService } =
    usePeluqueriaStore();

  const { isServiceModalOpen, closeModal, openEditServiceModal } = useUiStore();

  const [formSubmited, setFormSubmited] = useState(false);

  const [formValues, setFormValues] = useState({
    service: undefined,
  });

  const onSelectedChange = ({ target }, changing) => {
    setFormValues({
      ...formValues,
      [changing]: target.value,
    });
  };

  const onCloseModal = () => {
    closeModal();
  };

  useEffect(() => {
    setActiveService(formValues.service);
  }, [formValues]);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);

    if (isNaN(formValues.service)) {
      Swal.fire("Error en el servicio", "No ha marcado un servicio", "error");
      console.log("Error en el servicio");
      return;
    }

    closeModal();
    openEditServiceModal();
  };

  const handleNewClick = () => {
    setActiveService(null);
    closeModal();
    openEditServiceModal();
  };

  const handleDeleteClick = async () => {
    if (isNaN(formValues.service)) {
      Swal.fire("Error en el servicio", "No ha marcado un servicio", "error");
      console.log("Error en el servicio");
      return;
    }

    await startDeletingService(activeService);
  };

  return (
    <Modal
      isOpen={isServiceModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal modal-size"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Servicios </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <select
            className="form-select"
            value={formValues.service}
            size={5}
            onChange={(event) => onSelectedChange(event, "service")}
          >
            {services.map((s) => (
              <option value={s.id} key={s.id}>
                {s.name} - ${s.amount}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-outline-warning btn-block">
          <i className="far fa-edit"></i>
          <span> Editar</span>
        </button>

        <a
          type="button"
          className="btn btn-outline-danger btn-block ms-2"
          onClick={handleDeleteClick}
        >
          <i className="fas fa-trash"></i>
          <span> Eliminar</span>
        </a>

        <a
          type="button"
          className="btn btn-outline-primary btn-block ms-2"
          onClick={handleNewClick}
        >
          <i className="far fa-plus"></i>
          <span> Nuevo</span>
        </a>
      </form>
    </Modal>
  );
};
