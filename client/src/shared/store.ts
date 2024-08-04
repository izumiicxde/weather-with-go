import { atom, useAtom } from "jotai";
export interface WeatherData{
    city:{
        name: string
    }
    list:IList[]
}
export interface IList {
    dt_txt: string
    "main": {
        "temp":  number
        "feels_like": number
        "temp_min":  number
        "temp_max":  number
        "humidity":  number
    },
    "weather": 
        {
            "main":string
            "description":string
        }[]
}

export const weatherDataAtom  = atom<null | WeatherData>(null)
export const getWeatherDataAtom=()=> useAtom(weatherDataAtom)

//ATOM FOR THE CITY TO BE SEARCH 
export const searchQueryAtom = atom<string>("")
export const useSearchQueryAtom =()=> useAtom(searchQueryAtom)

// error state
export const queryErrorAtom = atom<string>("")
export const useQueryErrorAtom =()=> useAtom(queryErrorAtom)
