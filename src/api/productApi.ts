import axios from "axios";

const API_URL = "http://localhost:3000/products";

export const getProducts = (params = {}) => {
  return axios.get(API_URL, { params });
};

export const getProductById = (id: number) => {
  return axios.get(`${API_URL}/${id}`);
};
