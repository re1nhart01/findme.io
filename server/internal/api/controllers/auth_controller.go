package controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"pkg/utils"
)

type AuthController struct {
	*BaseController
}

func (auth *AuthController) GetName() string { return auth.Name }
func (auth *AuthController) GetPath() string { return auth.Path }

func (auth *AuthController) Register(ctx *gin.Context) {
	_, ok := ctx.Get("body")
	if !ok {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!"))
		return
	}

}

func (auth *AuthController) Login(ctx *gin.Context) {

}

func (auth *AuthController) VerifyCode(ctx *gin.Context) {

}

func (auth *AuthController) Delete(ctx *gin.Context) {

}

func CreateAuthController(basePath string) *AuthController {
	return &AuthController{
		&BaseController{
			"AuthController",
			fmt.Sprintf("%s/auth", basePath),
		},
	}
}
