// src/App.tsx

import { Calendar, momentLocalizer, Event, Components } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ko"; // 한국어 locale을 불러옵니다
import { useMemo } from "react";

// moment locale 설정
moment.locale("ko");
const localizer = momentLocalizer(moment);

export interface CustomCalendarProps extends Event {
  start: Date;
  end: Date;
  title: string;
  desc: string;
}

interface CustomCalendarEventProps {
  events: CustomCalendarProps[];
}
function EventTitle({ event }: { event: CustomCalendarProps }) {
  return (
    <span>
      <strong style={{ color: "#fff" }}>{event.title}</strong>
      <p style={{ fontSize: "8px" }}>{event.desc}</p>
    </span>
  );
}

function EventAgenda({ event }: { event: CustomCalendarProps }) {
  return (
    <span>
      <em style={{ color: "magenta" }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  );
}

const CustomCalendar = ({ events }: CustomCalendarEventProps) => {
  const { components } = useMemo(() => {
    const components: Components<CustomCalendarProps> = {
      agenda: {
        event: EventAgenda,
      },
      event: EventTitle,
    };
    return { components };
  }, []);

  return (
    <Calendar
      components={components}
      localizer={localizer}
      events={events}
      views={["agenda", "month", "work_week"]}
      defaultView="agenda"
      startAccessor="start"
      endAccessor="end"
      selectable
      showAllEvents
      style={{ height: 500 }}
    />
  );
};

// const handleSelectSlot = ({ start, end }: SlotInfo) => {
//   const title = window.prompt("새로운 이벤트의 제목을 입력하세요");
//   if (title) {
//     setEvents([...events, { start, end, title }]);
//   }
// };

// const handleSelectEvent = (event: CalendarEvent) => {
//   const newTitle = window.prompt("이벤트 제목을 수정하세요", event.title);
//   if (newTitle) {
//     setEvents(events.map(evt => (evt === event ? { ...event, title: newTitle } : evt)));
//   }
// };

// onSelectSlot={handleSelectSlot}
// onSelectEvent={handleSelectEvent}

export default CustomCalendar;
