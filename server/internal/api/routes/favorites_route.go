package routes

import (
	"app/controllers"
	"github.com/gin-gonic/gin"
)

type IFavoritesController interface {
	controllers.IBaseController
	AddToFavorites(ctx *gin.Context)
	RemoveFromFavorites(ctx *gin.Context)
	GetFavorites(ctx *gin.Context)
}

func FavoritesRoute(engine *gin.Engine, controller IFavoritesController) {
	router := engine.Group(controller.GetPath())
	{
		router.POST("/", controller.AddToFavorites)
		router.GET("/", controller.GetFavorites)
		router.DELETE("/", controller.RemoveFromFavorites)
	}
}
