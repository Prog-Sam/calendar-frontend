import React from 'react';
import { getPlasticTypes } from '../services/plasticTypeService';
import { useState } from 'react';
import { useEffect } from 'react';
import MyCalendar from '../common/calendar';
import { findEventItemsByStatus } from '../utils/eventItemMethods';


const PlasticTypeView = () => {
    const [eventItems, setEventItems] = useState([]);

    useEffect(() => {
        async function populateEventItems(){
            const {data} = await findEventItemsByStatus('ACTIVE');
            setEventItems(data)
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
