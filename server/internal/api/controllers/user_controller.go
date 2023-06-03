package controllers

import (
	"app/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"pkg/utils"
)

type UserController struct {
	*BaseController
	*services.UserService
}

func (user *UserController) GetName() string { return user.Name }
func (user *UserController) GetPath() string { return user.Path }

func (user *UserController) SetupFields(ctx *gin.Context) {
	//data, ok := ctx.Get("body")
	//if !ok {
	//	ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!"))
	//	return
	//}
	//fmt.Println(data)
	//validatedData, errors := dto.ValidateModelWithDto(data.(map[string]any), ApplicationDto.LoginDto, &dto.ErrorList{})
}

func (user *UserController) AttachPhotos(ctx *gin.Context) {

}

func (user *UserController) GetMe(ctx *gin.Context) {
	data, ok := ctx.Get("user")
	if !ok {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!"))
		return
	}
	userHash := data.(map[string]string)["user_hash"]
	userModel, err := user.GetUserByUserHash(userHash)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!"))
		return
	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponseWithData(userModel))
}

func CreateUserController(basePath string) *UserController {
	return &UserController{
		&BaseController{
			"UserController",
			fmt.Sprintf("%s/users", basePath),
		},
		&services.UserService{},
	}
}
