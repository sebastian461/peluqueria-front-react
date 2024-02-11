import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  FabAddNewEvent,
  FabAddNewService,
  Navbar,
  PeluqueriaEditServiceModal,
  PeluqueriaEventBox,
  PeluqueriaModal,
  PeluqueriaServiceModal,
} from "../components";

import { getMessagesEs, localizer } from "../../helpers";
import { useEffect, useState } from "react";
import { usePeluqueriaStore } from "../../hooks";

export const PeluqueriaPage = () => {
  const { events, setActiveEvent, getServices, activeService } =
    usePeluqueriaStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    getServices();
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {};

  const onSelect = (event) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
  };

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        defaultView={lastView}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: PeluqueriaEventBox,
        }}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <PeluqueriaModal />
      <PeluqueriaServiceModal />
      <PeluqueriaEditServiceModal />

      <FabAddNewService />
      <FabAddNewEvent />
    </>
  );
};
