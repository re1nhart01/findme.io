package controllers

import (
	ApplicationDto "app/dtos"
	"app/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"pkg/utils"
	"strings"
)

type InterestsTagsController struct {
	*BaseController
	*services.TAIService
}

func (tags *InterestsTagsController) GetName() string { return tags.Name }
func (tags *InterestsTagsController) GetPath() string { return tags.Path }

func (tags *InterestsTagsController) AddOrRemoveTags(ctx *gin.Context) {
	err, user, validated := tags.ManageTokenAndDto(ctx, ApplicationDto.AddOrRemoveDto)
	if err != nil {
		return
	}
	err = nil
	if validated["operation"] == "add" {
		err = tags.AddTags(validated["tag_list"].([]any), user["user_hash"].(string))
	} else if validated["operation"] == "remove" {
		err = tags.RemoveTags(validated["tag_list"].([]any), user["user_hash"].(string))
	}
	if err != nil && strings.Contains(err.Error(), "duplicated key not allowed") {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Duplicated tags!"))
		return
	}
	if err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!"))
		return
	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponse())
}

func CreateInterestsTagsController(basePath string) *InterestsTagsController {
	return &InterestsTagsController{
		&BaseController{
			"InterestsTagsController",
			fmt.Sprintf("%s/interests-tags", basePath),
		},
		&services.TAIService{},
	}
}
