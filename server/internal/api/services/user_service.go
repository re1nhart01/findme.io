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

func (user *UserService) GetUserByUserHash(userHash string) (*models.UserModel, error) {
	model := models.UserModel{}
	if getUserRes := pg_database.GetDatabaseInstance().
		Instance.
		Table(models.USERS).
		Where("user_hash = ?", userHash).
		Scan(&model); getUserRes.RowsAffected <= 0 {
		return &models.UserModel{}, errors.New("getUserByUserHash exception_1")
	}
	if tagListError := user.tai.GetTagsByUserHash(&model.Tags, userHash); tagListError != nil {
		return &models.UserModel{}, errors.New("getUserByUserHash exception_2")
	}
	if interestsListError := user.tai.GetInterestsByUserHash(&model.Interests, userHash); interestsListError != nil {
		return &models.UserModel{}, errors.New("getUserByUserHash exception_3")
	}
	if photoListError := user.files.GetPhotosByUserHash(&model.Photos, userHash); photoListError != nil {
		return &models.UserModel{}, errors.New("getUserByUserHash exception_4")
	}
	model.Password = ""
	return &model, nil
}
