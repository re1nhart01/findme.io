package models

import "fmt"

type TagsModel struct {
	Id         int    `json:"id" gorm:"column:id"`
	UserHashId string `json:"user_hash_id" json:"user_hash_id,omitempty" gorm:"user_hash_id:id"`
	TagLabel   string `json:"tag_label" gorm:"tag_label:id"`
}

func (TagsModel) TableName() string {
	return TAGS
}

func (tags TagsModel) GetId() int {
	return tags.Id
}

func CreateTagsTable() string {
	return fmt.Sprintf(`
	CREATE TABLE IF NOT EXISTS %s (
	id SERIAL PRIMARY KEY,
	user_hash_id VARCHAR(500) NOT NULL REFERENCES %s(user_hash) ON DELETE CASCADE,
	tag_label VARCHAR(500) NOT NULL,
	UNIQUE(user_hash_id, tag_label)
	)`, TAGS, USERS)
}
