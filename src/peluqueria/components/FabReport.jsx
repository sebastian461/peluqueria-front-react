import { useUiStore } from "../../hooks";

export const FabReport = () => {
  const { openReportModal } = useUiStore();

  const handleClickNew = () => {
    openReportModal();
  };

  return (
    <button className="btn btn-success fab fab-rep" onClick={handleClickNew}>
      <i className="fas fa-file"></i>
    </button>
  );
};
