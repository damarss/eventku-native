import axios from "axios";

const BASE_URL = "https://eventku-id.my.id";

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
