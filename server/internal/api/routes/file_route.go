package routes

import (
	"app/controllers"
	"github.com/gin-gonic/gin"
)

type IFileController interface {
	controllers.IBaseController
}

func FileRoute(engine *gin.Engine, controller IFileController) {
	router := engine.Group(controller.GetPath())
	{
		router.POST("/image")
	}
}
