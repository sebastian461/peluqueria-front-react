import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";

import { Navbar, PeluqueriaEventBox, PeluqueriaModal } from "../components";
import { getMessagesEs, localizer } from "../../helpers";
import { useState } from "react";
import { useUiStore } from "../../hooks";

const events = [
  {
    title: "Corte normal",
    amount: 2.5,
    start: new Date(),
    end: addHours(new Date(), 2),
    user: {
      id: 1,
      name: "Sebastián",
    },
  },
];

export const PeluqueriaPage = () => {
  const { openEventModal } = useUiStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {};

  const onSelect = (event) => {
    console.log({ onClick: event });
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
