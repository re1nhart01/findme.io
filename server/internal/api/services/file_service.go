package services

import (
	"errors"
	"internal/models"
	"internal/pg_database"
	"pkg/utils"
)

type FileService struct {
	*BaseService
	*CryptoService
}

func (file *FileService) GetService() any {
	return file
}

func (file *FileService) GenerateUniqueFileName(user any, serverFileName string) string {
	user_hash := user.(map[string]any)["user_hash"].(string)
	generatedHash := file.CryptoService.GenerateUniqueSha([]string{user_hash, serverFileName})
	extension := utils.GetFileExtensionFromFile(serverFileName)
	return generatedHash + "." + extension
}

func (file *FileService) GetPhotosByUserHash(photoList *[]string, userHash string) error {
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.USER_PHOTOS).Select([]string{"storage_bucket_id"}).Where("user_hash_id = ?", userHash).Scan(&photoList); res.RowsAffected <= 0 || res.Error != nil {
		return errors.New("getPhotosByUserHash exception")
	}
	return nil
}
