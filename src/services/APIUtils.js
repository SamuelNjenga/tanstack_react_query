import axios from "axios";

import { API_BASE_URL } from "../constants";

export const getUsers = () => {
  return axios.get(`${API_BASE_URL}/users`);
};

export const getTweets = () => {
  return axios.get(`${API_BASE_URL}/tweets`);
};
