import React, { useEffect, useState } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../hooks/useForm';
import { getEventType, saveEventType, updateEventType } from '../services/eventTypeService';
import { findEventTypesByUserId } from '../utils/eventTypeMethods';
import { toast } from 'react-toastify';
import { getEventColors } from '../services/eventColorService';
import { getCurrentUser } from '../services/authService';

const EventTypeForm = (props) => {
  const localEnums = {};
  const [eventColors, setEventColors] = useState([]);

  const schema = {
    id: Joi.number().label('ID'),
    name: Joi.string().required().label('Name'),
    colorId: Joi.number().required().label('Color'),
    userId: Joi.number().required().label('User'),
};

  useEffect(() => {
    const eventTypeId = props.match.params.id;
    
    async function populateUserId() {
       await setEventType({...eventType, ['id']:0,['userId']: await getCurrentUser().id })
    }

    populateUserId();

    async function populateColors(){
        const {data} = await getEventColors();
        setEventColors(data);
    }

    populateColors();

    if (eventTypeId === 'New') return;

    async function populateEventType() {
      let { data } = await getEventType(eventTypeId);
      setEventType(data);
    }

    populateEventType();

    if (!eventType) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await saveEventType(mapToViewModel(eventType))
        : await updateEventType(mapToViewModel(eventType));
      toast(
        `EventType ${eventType.name} with the id of ${eventType.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/eventTypes');
    } catch (e) {
      console.error(e);
      toast(e);
    }
  };

  const [
    eventType,
    setEventType,
    handleSubmit,
    renderButton,
    renderInput,
    renderLabel,
    renderSelect,
    mapToViewModel,
    getSelectedOption,
  ] = useForm(schema, doSubmit);

  return (
    <div>
      <h1 className='d-flex align-items-left'>
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} EVENT TYPE
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderInput('name', 'Name')}
        {renderSelect('colorId', 'Color',_.map(eventColors, c => {
            return {id:c.id, name:c.name}
        }))}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default EventTypeForm;
