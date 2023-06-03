package models

import "fmt"

type TagsModel struct {
	Id         int    `json:"id"`
	UserHashId string `json:"user_hash_id" json:"user_hash_id,omitempty"`
	TagLabel   string `json:"tag_label"`
}

func (TagsModel) TableName() string {
	return TAGS
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
