import styled from "styled-components";
import Countries from "./components/Countries.tsx";
import {useEffect, useState} from "react";
import {getCountries as getCountriesApi} from "./api/countryApi.tsx";
import {countryState} from "./type/countryType.tsx";
import {CountryApiResponse} from "./interface/countryInterface.tsx";

function App() {
  const [countries, setCountries] = useState<countryState[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      const response: CountryApiResponse[] = await getCountriesApi();

      setCountries(
          response.map(country => {
            return {
              area: country.area,
              flag: country.flag,
              common: country.name.common,
              capital: country.capital,
              isSelected: false
            }
          })
      )
    }
    getCountries();
  }, [])

  const toggleSelected = (e: MouseEvent, area: number): void => {
    const newCountries = countries.map(country => {
      if (area === country.area) {
        country.isSelected = !country.isSelected
      }
      return country;
    });

    setCountries(newCountries)
  }

  return (
      <AppWrapper>
        <Countries isSelected={true} countries={countries} toggleSelected={toggleSelected}/>
        <Countries isSelected={false} countries={countries} toggleSelected={toggleSelected}/>
      </AppWrapper>
  )


}

const AppWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  //flex-wrap: wrap;
`


export default App
