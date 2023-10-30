import React, { useEffect, useRef } from "react";
import { Calendar, DayHeaderContentArg } from "@fullcalendar/core";
import { Component, createElement } from "@fullcalendar/core/preact";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

interface CustomDayHeaderProps {
  text: string;
}

class CustomDayHeader extends Component<CustomDayHeaderProps> {
  render() {
    return createElement("div", {}, "" + this.props.text + "");
  }
}

const MyCalendar = () => {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendar = new Calendar(calendarEl, {
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "prevYear,nextYear",
        },
        initialDate: new Date(),
        locale: ptBrLocale,
        navLinks: false,
        editable: false,
        dayMaxEvents: true,
        dayHeaderContent(arg: DayHeaderContentArg) {
          return createElement(CustomDayHeader, { text: arg.text });
        },
        events: [],
      });

      calendar.render();
    }
  }, []);

  return <div id="calendar" ref={calendarRef} style={{ maxHeight: "80vh" }} />;
};

export default MyCalendar;
