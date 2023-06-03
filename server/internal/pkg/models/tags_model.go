package models

import "fmt"

type TagsModel struct {
	BaseTypeModel
	UserModel  UserModel `gorm:"foreignKey:UserHashId" json:"user"`
	UserHashId string    `json:"user_hash_id" json:"user_hash_id,omitempty"`
	TagValue   string
}

func (TagsModel) TableName() string {
	return TAGS
}

func CreateTagsTable() string {
	return fmt.Sprintf(`
	CREATE TABLE IF NOT EXISTS %s (
	id SERIAL PRIMARY KEY,
	tag_label VARCHAR(500) UNIQUE NOT NULL
	)`, TAGS)
}
