package controllers

import (
	ApplicationDto "app/dtos"
	"app/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"pkg/utils"
)

type UserController struct {
	*BaseController
	*services.UserService
	*services.FileService
}

func (user *UserController) GetName() string { return user.Name }
func (user *UserController) GetPath() string { return user.Path }

func (user *UserController) UpdatePreferences(ctx *gin.Context) {
	err, userData, validated := user.ManageTokenAndDto(ctx, ApplicationDto.EditUserPreferencesDto)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	if err := user.UpdateUserPreferences(userHash, validated); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, err.Error()))
		return
	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponse())
}

func (user *UserController) UpdateGeolocation(ctx *gin.Context) {
	err, userData, validated := user.ManageTokenAndDto(ctx, ApplicationDto.GeolocationDto)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	if err := user.UpdateUserGeolocation(userHash, validated); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, err.Error()))
		return
	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponse())
}

func (user *UserController) SetupFields(ctx *gin.Context) {
	err, userData, validated := user.ManageTokenAndDto(ctx, ApplicationDto.EditUserDto)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	if err := user.UpdateFields(userHash, validated); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, err.Error()))
		return
	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponse())
}

func (user *UserController) AttachPhotos(ctx *gin.Context) {
	err, userData, validated := user.ManageTokenAndDto(ctx, ApplicationDto.AttachPhotoDto)
	if err != nil {
		return
	}
	err = user.AttachPhotoToUser(validated["bucket_ids"].([]any), userData["user_hash"].(string))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Can not attach photo to user"))
		return
	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponse())
	return
}

func (user *UserController) RemovePhotos(ctx *gin.Context) {
	err, userData, validated := user.ManageTokenAndDto(ctx, ApplicationDto.RemovePhotoDto)
	if err != nil {
		return
	}
	if err := user.RemovePhotoFromUser(validated["buckets_ids"].([]any), userData["user_hash"].(string)); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Can not remove photo from user"))
		return
	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponse())
}

func (user *UserController) GetUser(ctx *gin.Context) {
	userHash := ctx.Param("user_hash")
	if userHash == "" || len(userHash) < 10 {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Invalid user hash"))
		return
	}
	userModel, err := user.GetUserByUserHash(userHash)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!_1"))
		return
	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponseWithData(userModel))
}

func (user *UserController) GetMe(ctx *gin.Context) {
	err, userData := user.ManageToken(ctx)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	userModel, err := user.GetUserByUserHash(userHash)
	userPreferences, prefErr := user.GetUserPreferences(userHash)
	if err != nil || prefErr != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!_1"))
		return
	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponseWithData(map[string]any{
		"user":        userModel,
		"preferences": userPreferences,
	}))
}

func (user *UserController) GetUsersList(ctx *gin.Context) {
	err, userData := user.ManageToken(ctx)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	userModels, err := user.GetUsers(userHash)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!_1"))
		return
	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponseWithData(userModels))
}

func (user *UserController) GetPreferences(ctx *gin.Context) {
	err, userData := user.ManageToken(ctx)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	preferencesModel, err := user.GetUserPreferences(userHash)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!_1"))
		return
	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponseWithData(preferencesModel))
}

func (user *UserController) GetUserPhoto(ctx *gin.Context) {
	err, _ := user.ManageToken(ctx)
	query := ctx.Query("user_refer")
	if err != nil {
		return
	}
	var result []string
	if err := user.GetPhotosByUserHash(&result, query); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!_1"))

	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponseWithData(result))
}

func CreateUserController(basePath string) *UserController {
	return &UserController{
		&BaseController{
			"UserController",
			fmt.Sprintf("%s/users", basePath),
		},
		&services.UserService{},
		&services.FileService{},
	}
}
