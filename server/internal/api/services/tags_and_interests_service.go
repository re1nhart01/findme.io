package services

import (
	"errors"
	"internal/models"
	"internal/pg_database"
)

type TAIService struct {
	*BaseService
}

func (tai *TAIService) GetService() any {
	return tai
}

func (tai *TAIService) GetTagsByUserHash(array *[]models.TagsModel, userHash string) error {
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.TAGS).Where("user_hash_id = ?", userHash).Scan(&array); res.RowsAffected <= 0 || res.Error != nil {
		return errors.New("getTagsByUserHash exception")
	}
	return nil
}

func (tai *TAIService) GetInterestsByUserHash(array *[]models.UserInterestsModel, userHash string) error {
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.USER_INTERESTS).Where("user_hash_id = ?", userHash).Scan(&array); res.RowsAffected <= 0 || res.Error != nil {
		return errors.New("getTagsByUserHash exception")
	}
	return nil
}
