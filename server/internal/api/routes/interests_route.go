package routes

import (
	"app/controllers"

	"github.com/gin-gonic/gin"
)

type IInterestsController interface {
	controllers.IBaseController
}

func InterestsRoute(engine *gin.Engine, controller IInterestsController) {
	{

	}
}
