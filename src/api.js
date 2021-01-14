import axios from 'axios';

export const baseURL = "http://localhost:3000/";

const token = localStorage.getItem("access_token") || null;
export const http = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});