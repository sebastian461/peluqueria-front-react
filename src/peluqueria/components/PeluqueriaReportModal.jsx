import Modal from "react-modal";
import { customStyles } from "../../helpers";
import { useAdminStore, useUiStore } from "../../hooks";
import { useEffect, useState } from "react";
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";

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

  const [fileUrl, setFileUrl] = useState(null);

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
    setFileUrl(startGenerateReport(formValues));
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
        <div className="form-group mb-2">
          <label>Desde</label>
          <div className="customDatePickerWidth">
            <DatePicker
              selected={formValues.start}
              onChange={(event) => onDateChange(event, "start")}
              dateFormat={format}
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group mb-2">
          <label>Hasta</label>
          <div className="customDatePickerWidth">
            <DatePicker
              selected={formValues.start}
              onChange={(event) => onDateChange(event, "end")}
              dateFormat={format}
              className="form-control"
            />
          </div>
        </div>

        <hr />

        <div className="form-group mb-3">
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
        {fileUrl && (
          <a href={fileUrl} download="report.xlsx">
            Descargar
          </a>
        )}
      </form>
    </Modal>
  );
};
