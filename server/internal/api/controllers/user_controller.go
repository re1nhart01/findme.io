package controllers

import (
	"app/services"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	*BaseController
}

func (user *UserController) GetName() string { return user.Name }
func (user *UserController) GetPath() string { return user.Path }

func (user *UserController) CreateUser(ctx *gin.Context) {
	data := services.UserServiceInstance().GetUsers()
	ctx.JSON(200, map[string]any{
		"status": "zaebis",
		"data":   data,
	})
}

func CreateUserController() *UserController {
	return &UserController{
		&BaseController{
			"UserController",
			"/users",
		},
	}
}
