package services

import (
	"errors"
	"internal/models"
	"internal/pg_database"
	"log"
	"pkg/fsystem"
	"pkg/utils"
	"sync"
)

type FileService struct {
	*BaseService
	*CryptoService
}

var wg sync.WaitGroup

func (file *FileService) GetService() any {
	return file
}

func (file *FileService) GenerateUniqueFileName(user any, serverFileName string) string {
	userHash := user.(map[string]any)["user_hash"].(string)
	generatedHash := file.CryptoService.GenerateUniqueSha([]string{userHash, serverFileName})
	extension := utils.GetFileExtensionFromFile(serverFileName)
	return generatedHash + "." + extension
}

func (file *FileService) GetPhotosByUserHash(photoList *[]string, userHash string) error {
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.USER_PHOTOS).Select([]string{"storage_bucket_id"}).Where("user_hash_id = ?", userHash).Scan(&photoList); res.Error != nil {
		return errors.New("getPhotosByUserHash exception")
	}
	return nil
}

func (file *FileService) AttachPhotoToUser(bucketId, userHash string) error {
	model := models.UserPhotosModel{
		UserHashId:      userHash,
		StorageBucketId: bucketId,
		IsDefault:       false,
	}
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.USER_PHOTOS).Create(&model); res.Error != nil {
		return errors.New("attachPhotoToUser exception")
	}
	return nil
}

func (file *FileService) RemovePhotoFromUser(bucketIds []any, userHash string) error {
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.USER_PHOTOS).Where("user_hash_id = ? AND storage_bucket_id IN ?", userHash, bucketIds).Delete(&models.UserPhotosModel{}); res.Error != nil {
		return errors.New("attachPhotoToUser exception")
	}
	wg.Add(len(bucketIds))
	for _, v := range bucketIds {
		go func() {
			defer wg.Done()
			err := fsystem.RemoveFileFromBucket(v.(string))
			if err != nil {
				log.Fatal(err)
			}
		}()
	}
	wg.Wait()

	return nil
}
