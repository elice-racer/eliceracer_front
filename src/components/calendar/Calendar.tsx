// src/App.tsx

import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// moment locale 설정
const localizer = momentLocalizer(moment);

export interface CustomCalendarProps extends Event {
  start: Date;
  end: Date;
  title: string;
}

interface CustomCalendarEventProps {
  events: CustomCalendarProps[];
}

const CustomCalendar = ({ events }: CustomCalendarEventProps) => {
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

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      selectable
      // onSelectSlot={handleSelectSlot}
      // onSelectEvent={handleSelectEvent}
      style={{ height: 500 }}
    />
  );
};

export default CustomCalendar;
