import http from './httpService';

export async function getEventItems() {
  const eventItems = await http.get(`/event`);
  // console.log(result);
  return eventItems;
}

export async function getEventItem(id) {
  const eventItem = await http.get(`/event/${id}`);
  // console.log(result);
  return eventItem;
}

export async function saveEventItem(eventItem) {
  let localEventItem = { ...eventItem };
  delete localEventItem['id'];

  let eventItemInDb = await http.post(`/event`, localEventItem);
  return eventItemInDb;
}

export async function updateEventItem(eventItem) {
  let localEventItem = { ...eventItem };

  let eventItemInDb = await http.put(`/event/${eventItem.id}`, localEventItem);
  return eventItemInDb;
}

export async function deleteEventItem(id) {

  let eventItemInDb = await http.delete(`/event/${id}`);
  return eventItemInDb;
}
