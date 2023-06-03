package models

import "fmt"

type UserPhotosModel struct {
	Id              int    `json:"id"`
	UserHashId      string `json:"user_hash_id,omitempty" json:"user_hash_id,omitempty"`
	StorageBucketId string `json:"storage_bucket_id"`
	IsDefault       bool   `json:"is_default"`
}

func (UserPhotosModel) TableName() string {
	return USER_PHOTOS
}

func CreateUserPhotosTable() string {
	return fmt.Sprintf(`
CREATE TABLE IF NOT EXISTS %s (
id SERIAL PRIMARY KEY,
user_hash_id VARCHAR(500) NOT NULL REFERENCES %s(user_hash) ON DELETE CASCADE,
storage_bucket_id VARCHAR(500) NOT NULL,
is_default BOOL NOT NULL DEFAULT false,
UNIQUE(user_hash_id, storage_bucket_id)
)`, USER_PHOTOS, USERS)
}
