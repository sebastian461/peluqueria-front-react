import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onAddNewService,
  onDeleteService,
  onGetServices,
  onSetActiveEvent,
  onSetActiveService,
  onUpdateService,
} from "../store/peluqueria/peluqueriaSlice";
import peluqueriaApi from "../api/peluqueriaApi";

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
    try {
      if (service.id) {
        dispatch(
          onUpdateService({
            ...service,
            amount: parseFloat(service.amount),
          })
        );
        return;
      }

      const procecedService = {
        title: service.title,
        amount: parseFloat(service.amount),
      };

      const { data } = await peluqueriaApi.post("/service", procecedService);

      dispatch(onAddNewService(data.data.service));
    } catch (error) {
      console.log(error);
    }
  };

  const startDeletingService = async (service) => {
    //TODO: conectar a la bd
    dispatch(onDeleteService(service));
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

  const getServices = async () => {
    try {
      const { data } = await peluqueriaApi.get("/service");
      const { services } = data.data;
      dispatch(onGetServices(services));
    } catch (error) {
      console.log(error);
    }
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
    startDeletingService,
    getServices,
  };
};
