package controllers

import (
	"app/dtos"
	"app/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"internal/models"
	"net/http"
	"pkg/utils"
)

type FavoritesController struct {
	*BaseController
	*services.FavoritesService
}

func (fav *FavoritesController) GetName() string { return fav.Name }
func (fav *FavoritesController) GetPath() string { return fav.Path }

func (fav *FavoritesController) AddToFavorites(ctx *gin.Context) {
	err, userData, validated := fav.ManageTokenAndDto(ctx, dtos.FavoritesIdDto)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	userReferId := validated["user_refer_id"].(string)
	if err := fav.AddOrRemoveFavorite(userHash, userReferId, "add"); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, err.Error()))
		return
	} else {
		ctx.JSON(http.StatusOK, utils.GiveOKResponse())
	}
}

func (fav *FavoritesController) RemoveFromFavorites(ctx *gin.Context) {
	err, userData, validated := fav.ManageTokenAndDto(ctx, dtos.FavoritesIdDto)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	userReferId := validated["user_refer_id"].(string)
	if err := fav.AddOrRemoveFavorite(userHash, userReferId, "remove"); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, err.Error()))
		return
	} else {
		ctx.JSON(http.StatusOK, utils.GiveOKResponse())
	}
}

func (fav *FavoritesController) GetFavorites(ctx *gin.Context) {
	err, userData := fav.ManageToken(ctx)
	if err != nil {
		return
	}
	userHash := userData["user_hash"].(string)
	if model, err := fav.GetList(userHash); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, err.Error()))
		return
	} else {
		ctx.JSON(http.StatusOK, utils.GiveOKResponseWithData[[]models.UserFavoritesModel](model))
	}
}

func CreateFavoritesController(basePath string) *FavoritesController {
	return &FavoritesController{
		&BaseController{
			"FavoritesController",
			fmt.Sprintf("%s/favorites", basePath),
		},
		&services.FavoritesService{},
	}
}
