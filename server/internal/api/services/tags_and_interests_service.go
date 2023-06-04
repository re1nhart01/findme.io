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

func (tai *TAIService) AddTags(tagList []any, userHash string) error {
	var tagModels []*models.TagsModel
	for _, v := range tagList {
		cast, ok := v.(string)
		if !ok {
			return errors.New("addTags ex")
		}
		model := &models.TagsModel{
			UserHashId: userHash,
			TagLabel:   cast,
		}
		tagModels = append(tagModels, model)
	}
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.TAGS).Where("user_hash_id = ?", userHash).Create(&tagModels); res.Error != nil {
		return res.Error
	}
	return nil
}

func (tai *TAIService) RemoveTags(tagList []any, userHash string) error {
	model := &models.TagsModel{}
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.TAGS).Where("user_hash_id = ? AND id IN ?", userHash, tagList).Delete(&model); res.RowsAffected != int64(len(tagList)) || res.Error != nil {
		return errors.New("addTags ex")
	}
	return nil
}

func (tai *TAIService) GetTagsByUserHash(array *[]models.TagsModel, userHash string) error {
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.TAGS).Where("user_hash_id = ?", userHash).Scan(&array); res.Error != nil {
		return errors.New("getTagsByUserHash exception")
	}
	return nil
}

func (tai *TAIService) GetInterestsByUserHash(array *[]models.UserInterestsModel, userHash string) error {
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.USER_INTERESTS).Where("user_hash_id = ?", userHash).Scan(&array); res.Error != nil {
		return errors.New("getTagsByUserHash exception")
	}
	return nil
}
