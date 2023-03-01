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