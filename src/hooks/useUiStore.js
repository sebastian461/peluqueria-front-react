import { useDispatch, useSelector } from "react-redux";
import {
  onCloseModal,
  onOpenEditServiceModal,
  onOpenEventModal,
  onOpenServiceModal,
  onOpenReportModal,
} from "../store/ui/uiSlice";

export const useUiStore = () => {
  const {
    isEditServiceModalOpen,
    isEventModalOpen,
    isReportModalOpen,
    isServiceModalOpen,
  } = useSelector((state) => state.ui);
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

  const openReportModal = () => {
    dispatch(onOpenReportModal());
  };

  return {
    //* Propiedades
    isEditServiceModalOpen,
    isEventModalOpen,
    isReportModalOpen,
    isServiceModalOpen,

    //* Métodos
    closeModal,
    openEditServiceModal,
    openEventModal,
    openReportModal,
    openServiceModal,
  };
};
