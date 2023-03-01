import { generateQueryStringFromObject } from "./queryUtil";
import {getEventItem, getEventItems, updateEventItem} from '../services/eventItemService'
import { getCurrentUser } from "../services/authService";

export async function findEventItemsByStatus(status) {
    let queryObject = {
        userId: getCurrentUser().id,
        status:status,
        includeEventType: 'true'
    }

    const eventItems = await getEventItems(generateQueryStringFromObject(queryObject));
    return eventItems || [];
}

export async function updateEventItemStatus(id, status){
    const {data} = await getEventItem(id);
    let eventItem = {...data, ['status']:status};

    await updateEventItem(eventItem);
    return eventItem;
}

export async function reactifyEvent({id, name, startDate, endDate, EventType}) {
   return {
        id,
        title: name,
        startDate,
        endDate,
        color: EventType.EventColor.value
    }
}

export async function reactifyEvents(events){
    let localEvents = [];

    for(let e of events){
        localEvents.push(await reactifyEvent(e))
    }

    return localEvents;
}

export const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.color,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    }
    return {
      style: style,
    }
  }