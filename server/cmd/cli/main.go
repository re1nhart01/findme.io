package main

import (
	"fmt"
	"internal/api"
	"internal/database"
	"internal/env"
)

func main() {
	database.GetDB()
	env.Init()
	port := env.ReadEnv("PORT")
	app := api.NewApp(true)
	err := app.Run(port)
	if err != nil {
		panic(fmt.Sprintf("%s%s", "Server can not run", err.Error()))
	}
}
