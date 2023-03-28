package pg_database

import (
	"fmt"
	"internal/models"
)

func InitTables() {
	inst := GetDatabaseInstance()
	inst.CreateDatabaseTable(models.MOOD, models.MoodModel{})
	inst.CreateDatabaseTable(models.USERS, models.UserModel{})
	inst.CreateDatabaseTable(models.INTERESTS, models.InterestsModel{})
	inst.CreateDatabaseTable(models.MATCHES, models.MatchesModel{})
	inst.CreateDatabaseTable(models.NOTIFICATIONS, models.NotificationsModel{})
	inst.CreateDatabaseTable(models.TAGS, models.TagsModel{})
	inst.CreateDatabaseTable(models.USER_DEVICE, models.UserDeviceModel{})
	inst.CreateDatabaseTable(models.USER_POSTS, models.UserPostModel{})
	inst.CreateDatabaseTable(models.USER_PREFERENCES, models.UserPreferenceModel{})
}

func (db *postgresInstance) CreateDatabaseTable(tableName string, model any) {
	if isExists := db.Instance.Migrator().HasTable(tableName); !isExists {
		err := db.Instance.Migrator().AutoMigrate(&model)
		if err != nil {
			panic(fmt.Sprintf("%s%s", "Error while create database table", err.Error()))
		}
	}
}