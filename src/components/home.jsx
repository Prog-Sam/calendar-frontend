import React from 'react';
import { getPlasticTypes } from '../services/plasticTypeService';
import { useState } from 'react';
import { useEffect } from 'react';
import MyCalendar from '../common/calendar';
import { findEventItemsByStatus, reactifyEvents } from '../utils/eventItemMethods';


const PlasticTypeView = () => {
    const [eventItems, setEventItems] = useState([]);

    useEffect(() => {
        async function populateEventItems(){
            const {data} = await findEventItemsByStatus('ACTIVE');
            console.log(data);
            console.log(reactifyEvents(data));
            console.log(await reactifyEvents(data));
            setEventItems( await reactifyEvents(data));
        }

        populateEventItems();
    }, {})
    

  return (
    <div>
      <MyCalendar name='cal' events={eventItems} />
    </div>
  );
};

export default PlasticTypeView;
