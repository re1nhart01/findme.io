package routes

import (
	"app/controllers"
	"github.com/gin-gonic/gin"
)

type ITagsInterestsController interface {
	controllers.IBaseController
	AddOrRemoveTags(ctx *gin.Context)
}

func TagsInterestsRoute(engine *gin.Engine, controller ITagsInterestsController) {
	router := engine.Group(controller.GetPath())
	{
		router.POST("/tags/add-or-remove", controller.AddOrRemoveTags)
	}
}
