import axios from "axios";

const baseInstance = () => {
  const API_URL = process.env.REACT_APP_API_URL_CRM;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return axios.create({
    baseURL: [API_URL],
    timeout: 5000,
    headers,
  });
};

const authInstance = () => {
  const API_URL = "https://api.crm.luminartechnolab.com/api";
  const authToken = localStorage.getItem("token");
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (authToken) {
    headers = { ...headers, Authorization: `Bearer ${authToken}` };
  }
  return axios.create({
    baseURL: [API_URL],
    timeout: 25000,
    headers,
  });
};



export default { baseInstance, authInstance };
