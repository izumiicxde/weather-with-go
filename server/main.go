package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

type WeatherResponse struct {
	City City   `json:"city"`
	List []List `json:"list"`
}

type City struct {
	Name string `json:"name"`
}

type List struct {
	DtTxt string `json:"dt_txt"`
	Main  struct {
		Temp      float64 `json:"temp"`
		FeelsLike float64 `json:"feels_like"`
		TempMin   float64 `json:"temp_min"`
		TempMax   float64 `json:"temp_max"`
		Humidity  int32   `json:"humidity"`
	} `json:"main"`
	Weather []struct {
		Main        string `json:"main"`
		Description string `json:"description"`
	} `json:"weather"`
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error reading environmental keys")
		return
	}

	app := fiber.New()
	city := "mumbai"

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowMethods: "GET, POST, PUT, DELETE",
		AllowHeaders: "Content-Type, Authorization",
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		weatherData, err := getData(city)
		if err != nil {
			return c.Status(http.StatusInternalServerError).SendString(fmt.Sprintf("Error fetching weather data: %v", err))
		}
		return c.JSON(weatherData)
	})

	app.Get("/:city", func(c *fiber.Ctx) error {
		city := c.Params("city")
		if city == "" {
			return c.Status(http.StatusInternalServerError).SendString(fmt.Sprintf("City name is empty"))
		}
		weatherData, err := getData(city)
		if err != nil {
			return c.Status(http.StatusInternalServerError).SendString(fmt.Sprintf("Error fetching weather data: %v", err))
		}
		return c.JSON(weatherData)
	})

	log.Fatal(app.Listen(":8000"))
}
