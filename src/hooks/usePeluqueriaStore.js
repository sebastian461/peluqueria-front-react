import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onAddNewService,
  onSetActiveEvent,
  onSetActiveService,
  onUpdateService,
} from "../store/peluqueria/peluqueriaSlice";

export const usePeluqueriaStore = () => {
  const dispatch = useDispatch();

  const { events, services, activeEvent, activeService } = useSelector(
    (state) => state.peluqueria
  );

  const setActiveEvent = (peluqueriaEvent) => {
    dispatch(onSetActiveEvent(peluqueriaEvent));
  };

  const setActiveService = (service) => {
    if (service !== null) {
      const peluqueriaService = services.find(
        (s) => s.id === parseInt(service)
      );
      dispatch(onSetActiveService(peluqueriaService));
      return;
    }
    dispatch(onSetActiveService(service));
  };

  const startSavingService = async (service) => {
    //TODO: conectar a la bd
    if (service.id) {
      dispatch(
        onUpdateService({
          ...service,
          amount: parseFloat(service.amount),
        })
      );
      return;
    }

    dispatch(
      onAddNewService({
        id: new Date().getTime(),
        ...service,
        amount: parseFloat(service.amount),
      })
    );
  };

  const startSavingEvent = async (peluqueriaEvent) => {
    //TODO: conectar a la bd
    const peluqueriaService = services.find(
      (s) => s.id === parseInt(peluqueriaEvent.service)
    );

    delete peluqueriaEvent.service;

    dispatch(
      onAddNewEvent({
        id: new Date().getTime(),
        title: peluqueriaService.name,
        amount: peluqueriaService.amount,
        ...peluqueriaEvent,
      })
    );
  };

  return {
    //* Propiedades
    events,
    services,
    activeEvent,
    activeService,

    //* Métodos
    setActiveEvent,
    setActiveService,
    startSavingEvent,
    startSavingService,
  };
};
