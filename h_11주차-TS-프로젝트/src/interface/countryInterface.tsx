import {countryState, defaultCountryPropsType} from "../type/countryType.tsx";

export interface CountryApiResponse extends Omit<countryState, "isSelected" | "common"> {
  name: { common: string }
}

export interface CountriesProps extends defaultCountryPropsType {
  countries: countryState[],
}

export interface CountryProps extends defaultCountryPropsType {
  country: countryState,
}