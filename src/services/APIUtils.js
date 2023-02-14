import axios from "axios";

import { API_BASE_URL } from "../constants";

export const getUsers = () => {
  return axios.get(`${API_BASE_URL}/users`);
};

export const getUser = (userId) => {
  return axios.get(`${API_BASE_URL}/users/${userId}`);
};

export const getTweets = (pageNo) => {
  return axios.get(`${API_BASE_URL}/tweets?page=${pageNo}`);
};

export const getAllTweets = (limit, lastTweet) => {
  return axios.get(
    `${API_BASE_URL}/tweets/all?limit=${limit}&lastTweet=${lastTweet}`
  );
};

export const getInfiniteTweets = (limit, lastTweet) => {
  return axios.get(
    `${API_BASE_URL}/tweets/infinite?limit=${limit}&lastTweet=${lastTweet}`
  );
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

export const createTweet = ({ message, userId, noOfLikes }) => {
  return axios
    .post(`${API_BASE_URL}/tweets`, {
      message: message,
      userId: userId,
      noOfLikes: noOfLikes,
    })
    .then((res) => res.data);
};
