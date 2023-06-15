import { api, fetchAPI } from ".";
import { LoginUserDto, RegisterUserDto } from "../interfaces/user";

export const registerAPI = async (body: RegisterUserDto) => {
  const data = await api.post("auth/register", body);
  return data.data;
};

export const loginAPI = async (body: LoginUserDto) => {
  const data = await api.post("auth/login", body);
  return data.data;
};

export const meAPI = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
