package controllers

import (
	ApplicationDto "app/dtos"
	"app/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"internal/models"
	"net/http"
	"pkg/utils"
)

type MatchesController struct {
	*BaseController
	*services.MatchesService
	user *services.UserService
	tai  *services.TAIService
}

func (matches *MatchesController) GetName() string { return matches.Name }
func (matches *MatchesController) GetPath() string { return matches.Path }

func (matches *MatchesController) GetUsersMatching(ctx *gin.Context) {
	err, userData, validated := matches.ManageTokenAndDto(ctx, ApplicationDto.GetMatchesDto)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	currentUserModel, err := matches.user.GetUserByUserHash(userHash)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, err.Error()))
	}
	tagsIds := matches.tai.GetTagsIds(currentUserModel.Tags)
	interestsIds := matches.tai.GetInterestsIds(currentUserModel.Interests)

	if matchesList, err := matches.RequestForMatchesList(userHash, validated, currentUserModel, tagsIds, interestsIds); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, err.Error()))
		return
	} else {
		ctx.JSON(http.StatusOK, utils.GiveOKResponseWithData[[]*models.UserModel](matchesList))
	}
}

func (matches *MatchesController) GetMatches(ctx *gin.Context) {
	err, userData, validated := matches.ManageTokenAndDto(ctx, ApplicationDto.MatchesListDto)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	listType := validated["type"].(string)
	if items, err := matches.GetUserMatches(userHash, listType); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, err.Error()))
		return
	} else {
		ctx.JSON(http.StatusOK, utils.GiveOKResponseWithData[[]*models.FullUserMatchModel](items))
	}
}

func (matches *MatchesController) MatchUser(ctx *gin.Context) {
	err, userData, validated := matches.ManageTokenAndDto(ctx, ApplicationDto.MatchUserDto)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	if err := matches.SwipeMatch(userHash, validated); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, err.Error()))
		return
	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponse())
}

func (matches *MatchesController) UpdateMatch(ctx *gin.Context) {
	err, userData, validated := matches.ManageTokenAndDto(ctx, ApplicationDto.MatchUserDto)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	if err := matches.UpdateUserMatch(userHash, validated); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, err.Error()))
		return
	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponse())
}

func (matches *MatchesController) RemoveMatch(ctx *gin.Context) {
	err, userData, validated := matches.ManageTokenAndDto(ctx, ApplicationDto.MatchUserDto)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	if err := matches.RemoveUserMatch(userHash, validated); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, err.Error()))
		return
	}
	ctx.JSON(http.StatusOK, utils.GiveOKResponse())
}

func CreateMatchesController(basePath string) *MatchesController {
	return &MatchesController{
		&BaseController{
			"MatchesController",
			fmt.Sprintf("%s/matches", basePath),
		},
		&services.MatchesService{},
		&services.UserService{},
		&services.TAIService{},
	}
}
