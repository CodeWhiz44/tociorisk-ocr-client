import axios, { AxiosRequestHeaders } from "axios"

export const getApiClient = (headers?: AxiosRequestHeaders) => {
  return axios.create({
    headers,
    withCredentials: true,
    baseURL: `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_PORT}`,
  })
}
