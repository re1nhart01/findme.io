package services

import (
	"errors"
	"internal/models"
	"internal/pg_database"
)

type UserService struct {
	*BaseService
	tai   *TAIService
	files *FileService
}

func (user *UserService) UpdateUserGeolocation(userHash string, coords map[string]any) error {
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.USERS).Where("user_hash = ?", userHash).Updates(&coords); res.RowsAffected <= 0 || res.Error != nil {
		return res.Error
	}
	return nil
}

func (user *UserService) UpdateUserPreferences(userHash string, fields map[string]any) error {
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.USER_PREFERENCES).Where("user_hash_id = ?", userHash).Updates(&fields); res.RowsAffected <= 0 || res.Error != nil {
		return res.Error
	}
	return nil
}

func (user *UserService) UpdateFields(userHash string, fields map[string]any) error {
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.USERS).Where("user_hash = ?", userHash).Updates(&fields); res.RowsAffected <= 0 || res.Error != nil {
		return res.Error
	}
	return nil
}

func (user *UserService) GetUserByUserHash(userHash string) (*models.UserModelFull, error) {
	model := models.UserModelFull{}
	if getUserRes := pg_database.GetDatabaseInstance().
		Instance.
		Table(models.USERS).
		Where("user_hash = ?", userHash).
		Scan(&model); getUserRes.RowsAffected <= 0 {
		return &models.UserModelFull{}, errors.New("getUserByUserHash exception_1")
	}
	if tagListError := user.tai.GetTagsByUserHash(&model.Tags, userHash); tagListError != nil {
		return &models.UserModelFull{}, errors.New("getUserByUserHash exception_2")
	}
	if interestsListError := user.tai.GetInterestsByUserHash(&model.Interests, userHash); interestsListError != nil {
		return &models.UserModelFull{}, errors.New("getUserByUserHash exception_3")
	}
	if photoListError := user.files.GetPhotosByUserHash(&model.Photos, userHash); photoListError != nil {
		return &models.UserModelFull{}, errors.New("getUserByUserHash exception_4")
	}
	model.Password = ""
	return &model, nil
}
