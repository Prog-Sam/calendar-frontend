import React, { Fragment } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US'
import { eventStyleGetter } from '../utils/eventItemMethods';

const locales = {
    'en-US': enUS
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

 const handleEventSelect = (event) => {
    console.log('Selected event:', event);
  };

const MyCalendar = ({
  name,
  events,
}) => {
  return (
    <Fragment>
      <Calendar
      name={name}
      localizer={localizer}
      events={events}
      startAccessor="startDate"
      endAccessor="endDate"
      onSelectEvent={handleEventSelect}
      selectable={true}
      eventPropGetter={eventStyleGetter}
      style={{ height: 500 }}
    />
    </Fragment>
  );
};

export default MyCalendar;
