import axios from "axios";

// const httpsAgent = new https.Agent({ rejectUnauthorized: false });
export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-Type": "application/json"
  }
});
