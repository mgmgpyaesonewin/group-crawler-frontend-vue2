import axios from 'axios';

export const baseURL = process.env.VUE_APP_API_URL;

const token = localStorage.getItem("access_token") || null;
export const http = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});