import http from './httpService';

export async function getEventTypes() {
  const eventTypes = await http.get(`/eventTypes`);
  // console.log(result);
  return eventTypes;
}

export async function getEventType(id) {
  const eventType = await http.get(`/eventTypes/${id}`);
  // console.log(result);
  return eventType;
}

export async function saveEventType(eventType) {
  let localEventType = { ...eventType };
  delete localEventType['id'];

  let eventTypeInDb = await http.post(`/eventTypes`, localEventType);
  return eventTypeInDb;
}

export async function updateEventType(eventType) {
  let localEventType = { ...eventType };

  let eventTypeInDb = await http.put(`/eventTypes/${eventType.id}`, localEventType);
  return eventTypeInDb;
}

export async function deleteEventType(id) {

  let eventTypeInDb = await http.delete(`/eventTypes/${id}`);
  return eventTypeInDb;
}
