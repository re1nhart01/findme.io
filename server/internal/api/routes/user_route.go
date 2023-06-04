package routes

import (
	"app/controllers"
	"github.com/gin-gonic/gin"
)

type IUserController interface {
	controllers.IBaseController
	GetMe(context *gin.Context)
	GetUser(context *gin.Context)
	UpdatePreferences(context *gin.Context)
	AttachPhotos(context *gin.Context)
	RemovePhotos(context *gin.Context)
	SetupFields(context *gin.Context)
	UpdateGeolocation(context *gin.Context)
}

func UserRouter(engine *gin.Engine, controller IUserController) {
	router := engine.Group(controller.GetPath())
	{
		router.GET("/:user_hash", controller.GetUser)
		router.GET("/me", controller.GetMe)
		router.PATCH("/me", controller.SetupFields)
		router.PATCH("/settings", controller.UpdatePreferences)
		router.POST("/photos/attach", controller.AttachPhotos)
		router.DELETE("/photos/remove", controller.RemovePhotos)
		router.POST("/geolocation/update", controller.UpdateGeolocation)
	}
}
