import axiosInstance from "./api.js";
import {CountryApiResponse} from "../interface/countryInterface.tsx";

export const getCountries = async (): Promise<CountryApiResponse[]> => {
  const axiosInstance1 = await axiosInstance.get("/v3.1/all");
  return axiosInstance1.data.slice(0, 40);
}