import { addHours } from "date-fns";
import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const services = [
  {
    id: 1,
    name: "Corte normal",
    amount: 2.5,
  },
  {
    id: 2,
    name: "Corte con barba",
    amount: 3,
  },
];

Modal.setAppElement("#root");

export const PeluqueriaModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [formValues, setFormValues] = useState({
    service: 0,
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const onSelectedChange = ({ target }, changing) => {
    setFormValues({
      ...formValues,
      [changing]: target.value,
    });
  };

  const onCloseModal = () => {
    console.log("Cerrando modal");
    setIsOpen(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (isNaN(formValues.service)) {
      console.log("Error en el servicio");
      return;
    }

    console.log(formValues);
  };

  return (
    <Modal
      isOpen={isOpen}
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
          <label>Fecha y hora fin</label>
          <select
            className="form-select"
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
