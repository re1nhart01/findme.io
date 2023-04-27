package services

import (
	"fmt"
	"internal/env"
	"internal/models"
	"internal/pg_database"
	"pkg/cryptography"
	"time"
)

type AuthService struct {
	*BaseService
}

func (auth *AuthService) GetService() any {
	return auth
}

func (auth *AuthService) CheckEmailExists(email string) bool {
	var existedModel models.UserModel
	return pg_database.
		GetDatabaseInstance().
		Instance.
		Table(models.USERS).
		Where("email = ?", email).
		Find(&existedModel).
		RowsAffected > 0
}

func (auth *AuthService) CheckPhoneExists(email string) bool {
	var existedModel models.UserModel
	return pg_database.
		GetDatabaseInstance().
		Instance.
		Table(models.USERS).
		Where("phone = ?", email).
		Find(&existedModel).
		RowsAffected > 0
}

func (auth *AuthService) CreateInitialUser(email, phone, fullName, password, country, city, details string, birthday time.Time) (string, error) {
	serverHash := env.ReadEnv("SERVER_HASH")
	userSalt := fmt.Sprintf("%s:%s:%s:%d", email, fullName, country, birthday.UnixMicro())
	userHash := cryptography.GetSha1(serverHash, userSalt)
	emptyUserModel := models.UserModel{
		UserHash: userHash,
		FullName: fullName,
		Birthday: birthday,
		Details:  details,
		Password: password,
		Email:    email,
		Active:   true,
		City:     city,
		Phone:    phone,
		Country:  country,
		Mood:     "Here to date",
		Gender:   "Male",
	}
	result := pg_database.GetDatabaseInstance().Instance.Table(models.USERS).Create(&emptyUserModel)
	return userHash, result.Error
}

func (auth *AuthService) CreateUserPreferences(userHash string) error {
	emptyUserModel := models.UserPreferenceModel{
		UserHashId:     userHash,
		Theme:          false,
		Lang:           "en-EN",
		Muted:          false,
		EmergencyAlert: false,
		Coords:         "(0,0)",
	}
	result := pg_database.GetDatabaseInstance().Instance.Table(models.USER_PREFERENCES).Create(&emptyUserModel)
	return result.Error
}
