import axios from "axios";

const BASE_URL = "http://127.0.0.1:8080";
console.log(BASE_URL)
export default axios.create({
  baseURL: `${BASE_URL}/auth/`,
});

// export const axiosAuth = axios.create({
//   baseURL: `${BASE_URL}/api/v1/`,
//   headers: {
//     Authorization: `Bearer ${cookies.get("token")}`,
//   },
// });
