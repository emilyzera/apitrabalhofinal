import axios, { AxiosResponse } from "axios";
import LoginUsuarioType from "../types/Login.type";
import ApiResponseType from "../types/ApiType";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const loginUser = async (
  login: LoginUsuarioType
): Promise<ApiResponseType> => {
  try {
    const result = await api.post(
      "recado/fetchrecados",
      login
    );
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

const apiGet = async (url: string) => {
  const response: AxiosResponse = await axios.get(url);
  return response;
};

const apiPut = async (url: string, data: any) => {
  const response: AxiosResponse = await axios.put(url, data);
  return response;
};

const apiPost = async (url: string, data: any) => {
  const response: AxiosResponse = await axios.post(url, data);
  return response;
};

const apiDelete = async (url: string) => {
  const response: AxiosResponse = await axios.delete(url);
  return response;
};

export { apiGet, apiPut, apiPost, apiDelete };
