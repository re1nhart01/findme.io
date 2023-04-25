package services

import (
	"internal/models"
	"internal/pg_database"
)

type AuthService struct {
	*BaseService
}

func (auth *AuthService) GetService() any {
	return auth
}

func (auth *AuthService) CheckEmailExists(email string) bool {
	var existedModel models.UserModel
	return pg_database.GetDatabaseInstance().Instance.Table(models.USERS).Where("email = ?", email).Find(&existedModel).RowsAffected > 0
}
