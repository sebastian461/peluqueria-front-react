import { useSelector } from "react-redux";

export const usePeluqueriaStore = () => {
  const { events, services, activeEvent } = useSelector(
    (state) => state.peluqueria
  );
  return {
    //* Propiedades
    events,
    services,
    activeEvent,

    //* Métodos
  };
};
