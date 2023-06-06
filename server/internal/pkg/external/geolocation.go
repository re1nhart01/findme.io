package external

import (
	"context"
	"encoding/json"
	"fmt"
	"internal/env"
	"io"
	"net/http"
	"time"
)

type CoordResponse struct {
	Name      string  `json:"name"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Country   string  `json:"country"`
	State     string  `json:"state"`
}

func GetCoordsByCityAndCountry(emptyModel *CoordResponse, city, country string) *CoordResponse {
	apiKey := env.ReadEnv("GEOCODE_API_KEY")
	apiURL := env.ReadEnv("GEOCODE_COORDS_LINK")
	if apiKey == "" || apiURL == "" {
		return emptyModel
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()
	client := &http.Client{}
	req, err := http.NewRequestWithContext(ctx, "GET", fmt.Sprintf(apiURL, city, country), nil)
	if err != nil {
		fmt.Println("GetCoordsByCityAndCountry", err)
		return emptyModel
	}
	req.Header.Add("X-Api-Key", apiKey)
	response, err := client.Do(req)
	if err != nil {
		fmt.Println("GetCoordsByCityAndCountry", err)
		return emptyModel
	}
	defer response.Body.Close()
	body, err := io.ReadAll(response.Body)
	if err != nil {
		fmt.Println("GetCoordsByCityAndCountry", err)
		return emptyModel
	}
	var result []*CoordResponse
	err = json.Unmarshal(body, &result)
	if err != nil {
		fmt.Println("GetCoordsByCityAndCountry", err)
		return emptyModel
	}
	if len(result) > 0 {
		return result[0]
	}
	return emptyModel
}
