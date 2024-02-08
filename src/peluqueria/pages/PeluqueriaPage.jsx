import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Navbar, PeluqueriaEventBox, PeluqueriaModal } from "../components";
import { getMessagesEs, localizer } from "../../helpers";
import { useState } from "react";
import { usePeluqueriaStore, useUiStore } from "../../hooks";

export const PeluqueriaPage = () => {
  const { events, setActiveEvent } = usePeluqueriaStore();
  const { openEventModal } = useUiStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {};

  const onSelect = (event) => {
    console.log({ onClick: event });
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
    </>
  );
};
