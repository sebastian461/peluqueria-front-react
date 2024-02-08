import { usePeluqueriaStore, useUiStore } from "../../hooks";

export const FabAddNewEvent = () => {
  const { openEventModal } = useUiStore();

  const handleClickNew = () => {
    openEventModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
