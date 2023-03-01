import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const EventItemTable = ({ eventItems, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (eventItem) => <Link to={'/events/' + eventItem.id}>{eventItem.name}</Link>,
      label: 'Name',
    },
    { path: 'EventType.name', label: 'Type' },
    { path: 'startDate', label: 'Start' },
    { path: 'endDate', label: 'End' },
    { path: 'status', label: 'Status' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={eventItems}
    />
  );
};

export default EventItemTable;
