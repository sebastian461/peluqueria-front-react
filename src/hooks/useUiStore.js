import { useDispatch, useSelector } from "react-redux";
import { onCloseModal, onOpenEventModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
  const { isEventModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const openEventModal = () => {
    dispatch(onOpenEventModal());
  };

  const closeModal = () => {
    dispatch(onCloseModal());
  };

  return {
    //* Propiedades
    isEventModalOpen,

    //* Métodos
    openEventModal,
    closeModal,
  };
};
