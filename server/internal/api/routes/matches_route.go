package routes

import (
	"app/controllers"
	"github.com/gin-gonic/gin"
)

type IMatchesController interface {
	controllers.IBaseController
	MatchUser(context *gin.Context)
	UpdateMatch(context *gin.Context)
	RemoveMatch(context *gin.Context)
	GetMatches(context *gin.Context)
}

func MatchesRoute(engine *gin.Engine, controller IMatchesController) {
	router := engine.Group(controller.GetPath())
	{
		// http://localhost:8080/auth/login
		router.POST("/match", controller.MatchUser)
		router.PATCH("/match", controller.UpdateMatch)
		router.DELETE("/match", controller.RemoveMatch)
		router.POST("/get", controller.GetMatches)
	}
}
