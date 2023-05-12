import axios, { AxiosResponse } from "axios";
import ApiResponseType from "../types/ApiType";
import LoginUsuarioType from "../types/Login.type";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
console.log(api);
export const loginUser = async (
  login: LoginUsuarioType
): Promise<ApiResponseType> => {
  try {
    const result = await api.post("usuario/login", login);

   return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString(),
    };
  }
};
