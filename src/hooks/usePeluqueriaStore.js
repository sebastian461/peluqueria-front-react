import { useDispatch, useSelector } from "react-redux";
import { onSetActiveEvent } from "../store/peluqueria/peluqueriaSlice";

export const usePeluqueriaStore = () => {
  const dispatch = useDispatch();

  const { events, services, activeEvent } = useSelector(
    (state) => state.peluqueria
  );

  const setActiveEvent = (peluqueriaEvent) => {
    dispatch(onSetActiveEvent(peluqueriaEvent));
  };

  return {
    //* Propiedades
    events,
    services,
    activeEvent,

    //* Métodos
    setActiveEvent,
  };
};
