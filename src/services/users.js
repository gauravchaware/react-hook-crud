import api from "./api";

// get all users
export const getUsers = (queryString) =>
  api.get(queryString ? `/users?${queryString}` : `/users`);

// get user by id
export const getUserById = (id) => api.get(`/users/${id}`);

// add new user
export const postUser = (data) => api.post(`/users`, data);

// update user
export const putUser = (id, data) => api.put(`/users/${id}`, data);

// delete user
export const deleteUser = (id) => api.delete(`/users/${id}`);
