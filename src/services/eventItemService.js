import http from './httpService';

export async function getEventItems(query) {
  const eventItems = await http.get(`/eventItems`+query);
  // console.log(result);
  return eventItems;
}

export async function getEventItem(id) {
  const {data, res} = await http.get(`/eventItems/${id}`);
  // console.log(result);
  let localEventItem = {...data, 
    ['startDate']: new Date(await data.startDate.toString()),
    ['endDate']: new Date(await data.endDate.toString()),
    ['alarm']: new Date(await data.alarm.toString()),
    }
  return {data: localEventItem, res};
}

export async function saveEventItem(eventItem) {
  let localEventItem = { ...eventItem };
  delete localEventItem['id'];

  let eventItemInDb = await http.post(`/eventItems`, localEventItem);
  return eventItemInDb;
}

export async function updateEventItem(eventItem) {
  let localEventItem = { ...eventItem };

  let eventItemInDb = await http.put(`/eventItems/${eventItem.id}`, localEventItem);
  return eventItemInDb;
}

export async function deleteEventItem(id) {

  let eventItemInDb = await http.delete(`/eventItems/${id}`);
  return eventItemInDb;
}
