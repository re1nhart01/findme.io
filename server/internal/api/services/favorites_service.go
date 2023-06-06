package services

import (
	"internal/models"
	"internal/pg_database"
)

type FavoritesService struct {
	*BaseService
}

func (fav *FavoritesService) AddOrRemoveFavorite(userHash, userReferHash string, op string) error {
	model := models.UserFavoritesModel{
		Owner:    userHash,
		Accessor: userReferHash,
	}
	if op == "add" {
		if res := pg_database.GetDatabaseInstance().Instance.Table(models.USER_FAVORITES).Create(&model); res.Error != nil {
			return res.Error
		}
	} else {
		if res := pg_database.GetDatabaseInstance().Instance.Table(models.USER_FAVORITES).Delete(&model); res.Error != nil {
			return res.Error
		}
	}
	return nil
}

func (fav *FavoritesService) GetList(userHash string) ([]models.UserFavoritesModel, error) {
	var model []models.UserFavoritesModel
	if res := pg_database.GetDatabaseInstance().Instance.Raw(models.GetFavoritesList(userHash)).Scan(&model); res.Error != nil {
		return []models.UserFavoritesModel{}, res.Error
	}
	return model, nil
}
