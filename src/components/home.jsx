import React from 'react';
import { getPlasticTypes } from '../services/plasticTypeService';
import { useState } from 'react';
import { useEffect } from 'react';
import MyCalendar from '../common/calendar';

const PlasticTypeView = () => {
    const [eventItems, setEventItems] = useState([]);

    // useEffect(() => {
    //     async function populateEventItems(){
    //         const {data} = await getPlasticTypes();
    //         setEventItems(data)
    //     }

    //     populateEventItems();
    // }, {})
    

  return (
    <div>
      <MyCalendar name='cal' events={eventItems} />
    </div>
  );
};

export default PlasticTypeView;
