import axios from "axios";

// const BASE_URL = "https://eventku-id.my.id";
const BASE_URL = "http://192.168.1.8";

export default axios.create({
  baseURL: `${BASE_URL}/auth/`,
});

export const axiosAuth = (token) =>
  axios.create({
    baseURL: `${BASE_URL}/api/v1/`,
    headers: {
      Authorization: `Bearer ${token}}`,
    },
  });
