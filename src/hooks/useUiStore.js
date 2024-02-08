import { useDispatch, useSelector } from "react-redux";
import {
  onCloseModal,
  onOpenEditServiceModal,
  onOpenEventModal,
  onOpenServiceModal,
} from "../store/ui/uiSlice";

export const useUiStore = () => {
  const { isEventModalOpen, isServiceModalOpen, isEditServiceModalOpen } =
    useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const openEventModal = () => {
    dispatch(onOpenEventModal());
  };

  const openServiceModal = () => {
    dispatch(onOpenServiceModal());
  };

  const openEditServiceModal = (service = {}) => {
    dispatch(onOpenEditServiceModal());
  };

  const closeModal = () => {
    dispatch(onCloseModal());
  };

  return {
    //* Propiedades
    isEventModalOpen,
    isServiceModalOpen,
    isEditServiceModalOpen,

    //* Métodos
    closeModal,
    openEditServiceModal,
    openEventModal,
    openServiceModal,
  };
};
