import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';

const EventTypeTable = ({ eventTypes, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'name',
      content: (eventType) => <Link to={'/eventTypes/' + eventType.id}>{eventType.name}</Link>,
      label: 'Name',
    },
    { path: 'EventColor.name', label: 'Color' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={eventTypes}
    />
  );
};

export default EventTypeTable;
