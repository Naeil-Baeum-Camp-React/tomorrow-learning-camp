import styled from "styled-components";
import React from "react";
import {CountryProps} from "../interface/countryInterface.tsx";

const Country: React.FC<CountryProps> = ({isSelected, country, toggleSelected}) => {
  return (
      <CountryContainer $isSelected={isSelected} onClick={e => toggleSelected(e, country.area)}>
          <Flag>{country.flag}</Flag>
          <Common>{country.common}</Common>
          <Capital>{country.capital}</Capital>
      </CountryContainer>
  );
}

const CountryContainer = styled.div`
  width: 300px;
  height: 150px;
  border: ${props => props.$isSelected ? "solid 1px yellowgreen" : ""};
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 10px 10px 10px;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 기본 쉐도우 */
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`

const Flag = styled.div`
  font-size: 100px;
  text-align: center;
`

const Common = styled.div`
  font-size: 20px;
`

const Capital = styled.div`
  font-size: 15px;
`

export default Country;