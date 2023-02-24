import http from './httpService';

export async function getEventColors() {
  const eventColors = await http.get(`/eventColors`);
  // console.log(result);
  return eventColors;
}

export async function getEventColor(id) {
  const eventColor = await http.get(`/eventColors/${id}`);
  // console.log(result);
  return eventColor;
}

export async function saveEventColor(eventColor) {
  let localEventColor = { ...eventColor };
  delete localEventColor['id'];

  let eventColorInDb = await http.post(`/eventColors`, localEventColor);
  return eventColorInDb;
}

export async function updateEventColor(eventColor) {
  let localEventColor = { ...eventColor };

  let eventColorInDb = await http.put(`/eventColors/${eventColor.id}`, localEventColor);
  return eventColorInDb;
}

export async function deleteEventColor(id) {

  let eventColorInDb = await http.delete(`/eventColors/${id}`);
  return eventColorInDb;
}
