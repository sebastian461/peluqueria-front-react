import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onAddNewService,
  onDeleteService,
  onGetEvents,
  onGetServices,
  onSetActiveEvent,
  onSetActiveService,
  onUpdateService,
} from "../store/peluqueria/peluqueriaSlice";
import peluqueriaApi from "../api/peluqueriaApi";
import { convertEventsToDateEvents } from "../helpers";

export const usePeluqueriaStore = () => {
  const dispatch = useDispatch();

  const { events, services, activeEvent, activeService } = useSelector(
    (state) => state.peluqueria
  );

  const getServices = async () => {
    try {
      const { data } = await peluqueriaApi.get("/service");
      const { services } = data.data;
      dispatch(onGetServices(services));
    } catch (error) {
      console.log(error);
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await peluqueriaApi.get("/event");

      const events = convertEventsToDateEvents(data.data.events);
      dispatch(onGetEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

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
    let procecedService = {};

    try {
      if (service.id) {
        procecedService = {
          ...service,
          amount: parseFloat(service.amount),
        };

        const { data } = await peluqueriaApi.put(
          `/service/${service.id}`,
          procecedService
        );

        dispatch(onUpdateService(data.data.service));
        return;
      }

      procecedService = {
        ...service,
        amount: parseFloat(service.amount),
      };

      const { data } = await peluqueriaApi.post("/service", procecedService);

      dispatch(onAddNewService(data.data.service));
    } catch (error) {
      console.log(error);
    }
  };

  const startDeletingService = async (service) => {
    try {
      await peluqueriaApi.delete(`/service/${service.id}`);
      dispatch(onDeleteService(service));
    } catch (error) {
      console.log(error);
    }
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
    startLoadingEvents,
    getServices,
    setActiveEvent,
    setActiveService,
    startDeletingService,
    startSavingEvent,
    startSavingService,
  };
};
