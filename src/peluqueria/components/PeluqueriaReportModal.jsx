import Modal from "react-modal";
import { customStyles } from "../../helpers";
import { useAdminStore, useUiStore } from "../../hooks";
import { useEffect, useState } from "react";
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { differenceInSeconds } from "date-fns";
import Swal from "sweetalert2";

registerLocale("es", es);

Modal.setAppElement("#root");

const initialFormValues = {
  id: undefined,
  name: undefined,
  start: new Date(),
  end: new Date(),
};

const format = "dd/MM/yyyy";

export const PeluqueriaReportModal = () => {
  const { isReportModalOpen, closeModal } = useUiStore();
  const { startLoadUsers, users, startGenerateReport } = useAdminStore();

  const [formValues, setFormValues] = useState(initialFormValues);

  const onSelectedChange = ({ target }, changin) => {
    setFormValues({
      ...formValues,
      [changin]: target.value,
    });
  };

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  useEffect(() => {
    startLoadUsers();
  }, [isReportModalOpen]);

  const onCloseModal = () => {
    closeModal();
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference < 0) {
      Swal.fire(
        "Las fechas no son correctas",
        "Revisar las fechas ingresadas",
        "error"
      );
      throw new Error("Las fechas no son correctas");
    }

    startGenerateReport(formValues);
    closeModal();
  };

  return (
    <Modal
      isOpen={isReportModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal modal-rep"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Reporte </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label>Desde</label>
          <div className="customDatePickerWidth">
            <DatePicker
              selected={formValues.start}
              onChange={(event) => onDateChange(event, "start")}
              dateFormat={format}
              className="form-control"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
              popperPlacement="bottom-start"
            />
          </div>
        </div>

        <div className="form-group mb-3">
          <label>Hasta</label>
          <div className="customDatePickerWidth">
            <DatePicker
              selected={formValues.end}
              onChange={(event) => onDateChange(event, "end")}
              dateFormat={format}
              className="form-control"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
              popperPlacement="bottom-start"
            />
          </div>
        </div>

        <hr className="mb-3" />

        <div className="form-group mb-4">
          <label>Encargado (opcional)</label>
          <select
            className="form-select"
            value={formValues.id}
            onChange={(event) => onSelectedChange(event, "id")}
            name="id"
          >
            <option value={null}>--Seleccionar--</option>
            {users.map((u) => (
              <option value={u.id} key={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="fa fa-file"></i>
          <span> Generar reporte</span>
        </button>
      </form>
    </Modal>
  );
};
