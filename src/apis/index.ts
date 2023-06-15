import { API_URL } from "../constants";
import Axios from "axios";

export const fetchAPI = async (
  url: string,
  method: string,
  token?: string,
  body?: any
) => {
  try {
    const data = await fetch(`${API_URL}/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "same-origin",
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    return await data.json();
  } catch (error) {
    console.log(error);
    return { statusCode: 500, message: `${error}` };
  }
};

export const api = Axios.create({
  baseURL: `${API_URL}`,
  // set credential to include
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});
