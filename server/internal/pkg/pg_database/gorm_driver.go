package pg_database

import (
	"fmt"
	"internal/models"
	"sync"
)

var wg sync.WaitGroup

func InitTables() {
	inst := GetDatabaseInstance()
	wg.Add(2)
	go func() {
		defer wg.Done()
		instance.CallManualSQL(models.CalculateCoords())
	}()
	go func() {
		defer wg.Done()
		inst.CallManualSQL(models.CreateInterestsTable())
		inst.CallManualSQL(models.CreateGenderTable())
		inst.CallManualSQL(models.CreateUserTable())
		inst.CallManualSQL(models.CreateUserPreferencesTable())
		inst.CallManualSQL(models.CreateGenderTable())
		inst.CallManualSQL(models.CreateMatchesTable())
		inst.CallManualSQL(models.CreateUserMessagesTable())
		inst.CallManualSQL(models.CreateNotificationTable())
		inst.CallManualSQL(models.CreateTagsTable())
		inst.CallManualSQL(models.CreateUserDeviceTable())
		inst.CallManualSQL(models.CreateFavoritesTable())
		inst.CallManualSQL(models.CreateUserPhotosTable())
		inst.CallManualSQL(models.CreateUserPreferencesTable())
		inst.CallManualSQL(models.CreateUserInterestsTable())
	}()
	wg.Wait()
}

func (db *postgresInstance) MigrateTable(tableName string, model any) {
	if isExists := db.Instance.Migrator().HasTable(tableName); !isExists {
		err := db.Instance.Migrator().AutoMigrate(&model)
		if err != nil {
			panic(fmt.Sprintf("%s%s", "Error while create database table", err.Error()))
		}
	}
}

func (db *postgresInstance) CallManualSQL(query string) {
	db.Instance.Exec(query)
}
