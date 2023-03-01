import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import { getEventItem, saveEventItem, updateEventItem } from '../services/eventItemService';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../services/authService';
import { findEventTypesByUserId } from '../utils/eventTypeMethods';

const EventItemForm = (props) => {
  const localEnums = {};
  const [eventTypes, setEventTypes] = useState([]);

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().label('Name'),
    EventTypeId: Joi.number().required().label('Event Type'),
    UserId: Joi.number().required().label('User'),
    startDate: Joi.date().required().label('Start'),
    endDate: Joi.date().required().label('End'),
    alarm: Joi.date().allow('').label('alarm'),
    status: Joi.string().required().label('Status'),
};

  useEffect(() => {
    const eventItemId = props.match.params.id;
    
    async function populateUserId() {
       await setEventItem({...eventItem, ['id']:0,['UserId']: await getCurrentUser().id })
    }

    populateUserId();

    async function populateEventTypes(){
        const {data} = await findEventTypesByUserId(getCurrentUser().id);
        setEventTypes(data);
    }

    populateEventTypes();

    if (eventItemId === 'New') return;

    async function populateEventItem() {
      let { data } = await getEventItem(eventItemId);
      setEventItem(data);
    }

    populateEventItem();

    if (!eventItem) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveEventItem(mapToViewModel(eventItem))
        : await updateEventItem(mapToViewModel(eventItem));
      toast(
        `EventItem ${eventItem.name} with the id of ${eventItem.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/events');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    eventItem,
    setEventItem,
    handleSubmit,
    renderButton,
    renderInput,
    renderLabel,
    renderSelect,
    mapToViewModel,
    getSelectedOption,
    renderColorDaySelector,
    renderFilePicker,
    renderDatePicker
  ] = useForm(schema, doSubmit);

  return (
    <div>
      <h1 className='d-flex align-items-left'>
        {props.match.params.id === 'New' ? 'ADD' : 'UPDATE'} EVENT
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('name', 'Name')}
        {renderSelect('EventTypeId', 'Event Type',_.map(eventTypes, c => {
            return {id:c.id, name:c.name}
        }))}
        {renderDatePicker('startDate', 'Start')}
        {renderDatePicker('endDate', 'End')}
        {renderDatePicker('alarm', 'Reminder')}
        {renderSelect('status', 'Status', [{id:'ACTIVE', name:'ACTIVE'},{id:'INACTIVE', name:'INACTIVE'},{id:'ARCHIVED', name:'ARCHIVED'}])}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default EventItemForm;
