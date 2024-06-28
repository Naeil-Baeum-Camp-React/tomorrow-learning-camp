export type countryState = {
  area: number
  flag: string
  common: string
  capital: string
  isSelected: boolean
}

export type defaultCountryPropsType = {
  isSelected: boolean,
  toggleSelected: (e:MouseEvent, area: number) => void
}

