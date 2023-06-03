package routes

import (
	"app/controllers"
	"github.com/gin-gonic/gin"
)

type IUserController interface {
	controllers.IBaseController
	GetMe(context *gin.Context)
}

func UserRouter(engine *gin.Engine, controller IUserController) {
	router := engine.Group(controller.GetPath())
	{
		router.GET("/me", controller.GetMe)
	}
}
