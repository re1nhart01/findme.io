package controllers

import (
	ApplicationDto "app/dtos"
	"app/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"pkg/utils"
)

type MatchesController struct {
	*BaseController
	*services.MatchesService
}

func (matches *MatchesController) GetName() string { return matches.Name }
func (matches *MatchesController) GetPath() string { return matches.Path }

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
	}
}
