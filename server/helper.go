package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

func getData(city string) (WeatherResponse, error) {

	apiKey := os.Getenv("WEATHER_API_KEY")
	url := "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=metric"

	res, err := http.Get(url)
	if err != nil {
		return WeatherResponse{}, fmt.Errorf("error making HTTP request: %v", err)
	}
	defer res.Body.Close()

	data, err := io.ReadAll(res.Body)
	if err != nil {
		return WeatherResponse{}, fmt.Errorf("error reading response body: %v", err)
	}

	var weatherData WeatherResponse
	if err := json.Unmarshal(data, &weatherData); err != nil {
		return WeatherResponse{}, fmt.Errorf("error decoding JSON response: %v", err)
	}
	return weatherData, nil
}
