import Modal from "react-modal";
import { customStyles } from "../../helpers";
import { useEffect, useState } from "react";
import { usePeluqueriaStore, useUiStore } from "../../hooks";
import Swal from "sweetalert2";

export const PeluqueriaEditServiceModal = () => {
  const { activeService, startSavingService } = usePeluqueriaStore();
  const { closeModal, isEditServiceModalOpen } = useUiStore();

  const [formValues, setFormValues] = useState({
    title: "",
    amount: 0,
  });

  useEffect(() => {
    if (activeService !== null) {
      setFormValues({
        ...activeService,
      });
      return;
    }

    setFormValues({
      title: "",
      amount: 0,
    });
  }, [activeService]);

  const onInputChage = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onCloseModal = () => {
    closeModal();
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (formValues.title.length <= 0) {
      Swal.fire("Error en el servicio", "No ha rellenado los campos", "error");
      console.log("Error en el servicio");
      return;
    }

    startSavingService(formValues);
    closeModal();
  };

  return (
    <Modal
      isOpen={isEditServiceModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal modal-size"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Servicio </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Nombre</label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={formValues.title}
            onChange={onInputChage}
          />
        </div>

        <div className="form-group mb-2">
          <label>Precio</label>
          <input
            className="form-control"
            type="number"
            min={0}
            step={0.01}
            name="amount"
            value={formValues.amount}
            onChange={onInputChage}
          />
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
