import http from './httpService';

export async function getUsers(query='') {
  const users = await http.get(`/users`+query);
  return users;
}

export async function getUser(id) {
  const user = await http.get(`/users/${id}`);
  // console.log(result);
  return user;
}

export async function saveUser(user) {
  let localUser = { ...user };
  delete localUser['id'];

  let userInDb = await http.post(`/users`, localUser);
  return userInDb;
}

export async function updateUser(user) {
  let localUser = { ...user };

  let userInDb = await http.put(`/users/${user.id}`, localUser);
  return userInDb;
}

export async function deleteUser(id) {

  let userInDb = await http.delete(`/users/${id}`);
  return userInDb;
}
