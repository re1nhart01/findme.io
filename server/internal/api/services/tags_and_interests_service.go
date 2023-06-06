package services

import (
	"errors"
	"fmt"
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

func (tai *TAIService) GetLikeTags(query string) ([]*models.TagsModel, error) {
	var model []*models.TagsModel
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.TAGS).Where("tag_label LIKE %?%", query).Scan(&model); res.Error != nil {
		return []*models.TagsModel{}, res.Error
	}
	return model, nil
}

func (tai *TAIService) UpdateUserInterests(userHash string, interestsList []any) error {
	removeErr := tai.RemoveAllInterests(userHash)
	if removeErr != nil {
		return removeErr
	}
	addErr := tai.AddInterests(interestsList, userHash)
	if addErr != nil {
		return addErr
	}
	return nil
}

func (tai *TAIService) GetTagsIds(tags []models.TagsModel) []int {
	var result []int
	for _, v := range tags {
		result = append(result, v.GetId())
	}
	return result
}

func (tai *TAIService) GetInterestsIds(interests []models.UserInterestsModel) []int {
	var result []int
	for _, v := range interests {
		result = append(result, v.Id)
	}
	return result
}
func (tai *TAIService) RemoveAllInterests(userHash string) error {
	model := &models.TagsModel{}
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.USER_INTERESTS).Where("user_hash_id = ?", userHash).Delete(&model); res.Error != nil {
		return errors.New("removeInterests ex")
	}
	return nil
}

func (tai *TAIService) AddInterests(interestsList []any, userHash string) error {
	model := []*models.UserInterestsModel{}
	for _, v := range interestsList {
		model = append(model, &models.UserInterestsModel{
			UserHashId:  userHash,
			InterestsId: int(v.(float64)),
		})
		fmt.Println(models.UserInterestsModel{
			UserHashId:  userHash,
			InterestsId: int(v.(float64)),
		})

	}
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.USER_INTERESTS).Create(&model); res.RowsAffected != int64(len(model)) || res.Error != nil {
		return errors.New("removeInterests ex")
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
