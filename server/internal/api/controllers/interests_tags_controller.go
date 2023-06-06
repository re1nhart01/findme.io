package controllers

import (
	ApplicationDto "app/dtos"
	"app/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"internal/models"
	"net/http"
	"pkg/utils"
	"strings"
)

type InterestsTagsController struct {
	*BaseController
	*services.TAIService
}

func (tai *InterestsTagsController) GetName() string { return tai.Name }
func (tai *InterestsTagsController) GetPath() string { return tai.Path }

func (tai *InterestsTagsController) AddOrRemoveTags(ctx *gin.Context) {
	err, user, validated := tai.ManageTokenAndDto(ctx, ApplicationDto.AddOrRemoveDto)
	if err != nil {
		return
	}
	err = nil
	if validated["operation"] == "add" {
		err = tai.AddTags(validated["tag_list"].([]any), user["user_hash"].(string))
	} else if validated["operation"] == "remove" {
		err = tai.RemoveTags(validated["tag_list"].([]any), user["user_hash"].(string))
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

func (tai *InterestsTagsController) GetSimilarTags(ctx *gin.Context) {
	query := ctx.Query("q")
	if query == "" {
		ctx.JSON(http.StatusOK, utils.GiveOKResponseWithData[[]int]([]int{}))
	}
	if similarTags, err := tai.GetLikeTags(query); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!_1"))
		return
	} else {
		ctx.JSON(http.StatusOK, utils.GiveOKResponseWithData[[]*models.TagsModel](similarTags))
	}
}

func (tai *InterestsTagsController) UpdateInterests(ctx *gin.Context) {
	err, userData, validated := tai.ManageTokenAndDto(ctx, ApplicationDto.UpdateInterestsDto)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	interestsList := validated["interests_list"].([]any)
	if updateErr := tai.UpdateUserInterests(userHash, interestsList); updateErr != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!_1"))
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
