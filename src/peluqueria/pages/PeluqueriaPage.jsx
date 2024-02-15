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
import { useAuthStore, usePeluqueriaStore } from "../../hooks";
import { FabReport } from "../components/FabReport";
import { PeluqueriaReportModal } from "../components/PeluqueriaReportModal";

export const PeluqueriaPage = () => {
  const { events, setActiveEvent, getServices, startLoadingEvents } =
    usePeluqueriaStore();

  const { user } = useAuthStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    startLoadingEvents();
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
      <FabAddNewEvent />

      {user.role === "admin" && (
        <>
          <FabAddNewService />
          <FabReport />

          <PeluqueriaServiceModal />
          <PeluqueriaEditServiceModal />
          <PeluqueriaReportModal />
        </>
      )}
    </>
  );
};
