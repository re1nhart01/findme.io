package api

import (
	"app/controllers"
	"app/routes"
	"github.com/gin-gonic/gin"
)

type FindMeIoApplication struct {
	Ver      string
	Instance *gin.Engine
}

func NewApp(withLogger bool) *FindMeIoApplication {
	inst := &FindMeIoApplication{
		Ver:      "0.0.1",
		Instance: gin.Default(),
	}
	if !withLogger {
		inst.Instance = gin.New()
	}
	return inst
}

func (app *FindMeIoApplication) Run(port string) error {
	userController := controllers.CreateUserController()

	routes.UserRouter(app.Instance, userController)

	err := app.Instance.Run(port)
	return err
}
