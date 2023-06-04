package controllers

import (
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	"pkg/dto"
	"pkg/utils"
)

type IBaseController interface {
	GetName() string
	GetPath() string
}

type BaseController struct {
	Name string
	Path string
}

func (base *BaseController) ManageTokenAndDto(ctx *gin.Context, dtoa *dto.FieldsMapping) (error, map[string]any, map[string]any) {
	data, bodyOk := ctx.Get("body")
	userData, ok := ctx.Get("user")
	if !ok || !bodyOk {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!"))
		return errors.New("manageTokenAndDto"), map[string]any{}, map[string]any{}
	}
	validatedFields, ers := dto.ValidateModelWithDto(data.(map[string]any), dtoa, &dto.ErrorList{})

	if len(*ers) > 0 {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponseWithErrors[*dto.ErrorList](ers))
		return errors.New("manageTokenAndDto"), map[string]any{}, map[string]any{}
	}
	return nil, userData.(map[string]any), validatedFields
}

func (base *BaseController) ManageToken(ctx *gin.Context) (error, map[string]any) {
	userData, ok := ctx.Get("user")
	if !ok {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Manage token bad request!"))
		return errors.New("manageTokenAndDto"), map[string]any{}
	}
	return nil, userData.(map[string]any)
}
