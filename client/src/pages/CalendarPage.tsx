import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import { eventApi } from '../api/events';

export function CalendarPage() {
  const [events, setEvents] = useState<any[]>([]);

  const load = async () => {
    const res = await eventApi.list();
    setEvents(
      res.data.data.map((e: any) => ({
        id: String(e.id),
        title: e.title,
        start: `${e.date}T${e.start_time}`,
        end: `${e.date}T${e.end_time}`
      }))
    );
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="rounded-xl border bg-white p-3 dark:bg-slate-900">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
        editable
        selectable
        events={events}
        dateClick={async (info) => {
          const title = prompt('Task title');
          if (!title) return;
          await eventApi.create({ title, date: info.dateStr, startTime: '09:00', endTime: '10:00' });
          load();
        }}
        eventDrop={async (info) => {
          const start = info.event.start!;
          const end = info.event.end || new Date(start.getTime() + 3600000);
          await eventApi.update(Number(info.event.id), {
            date: start.toISOString().slice(0, 10),
            startTime: start.toTimeString().slice(0, 5),
            endTime: end.toTimeString().slice(0, 5)
          });
        }}
      />
    </div>
  );
}
