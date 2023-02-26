import { generateQueryStringFromObject } from "./queryUtil";
import {getEventTypes} from '../services/eventTypeService';

export async function findEventTypesByUserId(userId) {
    let queryObject = {
        userId: userId,
        includeColor: 'true'
    }

    const eventTypes = await getEventTypes(generateQueryStringFromObject(queryObject));
    return eventTypes || [];
}