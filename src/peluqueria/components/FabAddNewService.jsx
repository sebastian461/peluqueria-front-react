import { useUiStore } from "../../hooks";

export const FabAddNewService = () => {
  const { openServiceModal } = useUiStore();

  const handleClickNew = () => {
    openServiceModal();
  };

  return (
    <button className="btn btn-warning fab fab-ser" onClick={handleClickNew}>
      <i className="fas fa-book"></i>
    </button>
  );
};
