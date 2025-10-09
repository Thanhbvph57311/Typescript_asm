import axios from "axios";

const API_URL = "http://localhost:3000/users";

export const getUsers = () => {
  return axios.get(API_URL);
};

export const getUserById = (id: number) => {
  return axios.get(`${API_URL}/${id}`);
};
