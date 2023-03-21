package controllers

import "github.com/gin-gonic/gin"

type AuthController struct {
	*BaseController
}

func (auth *AuthController) GetName() string { return auth.Name }
func (auth *AuthController) GetPath() string { return auth.Path }

func (auth *AuthController) Register(ctx *gin.Context) {

}

func (auth *AuthController) Login(ctx *gin.Context) {

}

func (auth *AuthController) VerifyCode(ctx *gin.Context) {

}

func (auth *AuthController) Delete(ctx *gin.Context) {

}

func CreateAuthController() *AuthController {
	return &AuthController{
		&BaseController{
			"AuthController",
			"/auth",
		},
	}
}
