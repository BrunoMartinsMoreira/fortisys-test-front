import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

export { api };
