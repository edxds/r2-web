import axios from 'axios';

export const http = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
