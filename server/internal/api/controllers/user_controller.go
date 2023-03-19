package controllers

import "github.com/gin-gonic/gin"

type UserController struct {
	*BaseController
}

func (user *UserController) GetName() string {
	return user.Name
}

func (user *UserController) GetPath() string {
	return user.Path
}

func (user *UserController) CreateUser(ctx *gin.Context) {
	ctx.JSON(200, map[string]string{
		"status": "zaebis",
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
