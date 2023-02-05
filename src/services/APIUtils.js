import axios from "axios";

import { API_BASE_URL } from "../constants";

export const getUsers = () => {
  return axios.get(`${API_BASE_URL}/users`);
};

export const getTweets = () => {
  return axios.get(`${API_BASE_URL}/tweets`);
};

export const createUser = ({ firstName, lastName, email }) => {
  return axios
    .post(`${API_BASE_URL}/users`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
    })
    .then((res) => res.data);
};
