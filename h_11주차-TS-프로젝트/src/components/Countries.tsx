import styled from "styled-components";
import Country from "./Country.tsx";
import {CountriesProps} from "../interface/countryInterface.tsx";
import React from "react";

const Countries: React.FC<CountriesProps> = ({isSelected, countries, toggleSelected}) => {
  return (
      <CountriesWrapper>
        <Title>{isSelected ? "Favorite Countries" : "Countries"}</Title>
        <CountryWrapper>
          {
            countries
            .filter(country => country.isSelected === isSelected)
            .map(country => <Country key={country.area}
                                     country={country}
                                     toggleSelected={toggleSelected}
                                     isSelected={isSelected}/>)
          }
        </CountryWrapper>
      </CountriesWrapper>
  );
}

const CountriesWrapper = styled.div`
  gap: 25px;
  display: flex;
  flex-direction: column;
`

const CountryWrapper = styled.div`
  margin-left: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`
const Title = styled.h1`
  font-weight: 600;
  font-size: 50px;
  text-align: center;
`

export default Countries;