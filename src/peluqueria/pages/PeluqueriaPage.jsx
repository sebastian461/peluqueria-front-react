import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";

import { Navbar } from "../components";
import { getMessagesEs, localizer } from "../../helpers";

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
  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log({ event, start, end, isSelected });
  };

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
      />
    </>
  );
};
