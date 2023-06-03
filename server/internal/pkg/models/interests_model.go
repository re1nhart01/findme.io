package models

import "fmt"

type Tabler interface {
	TableName() string
}
type InterestsModel struct {
	BaseTypeModel
	UserModel      UserModel `gorm:"foreignKey:UserHashId"`
	UserHashId     string    `json:"user_hash_id,omitempty" json:"user_hash_id,omitempty"`
	InterestsLabel string    `json:"interests_label"`
}

func (InterestsModel) TableName() string {
	return INTERESTS
}

func CreateInterestsTable() string {
	return fmt.Sprintf(`
	CREATE TABLE IF NOT EXISTS %s (
	id SERIAL PRIMARY KEY,
	interests_label VARCHAR(500) UNIQUE NOT NULL`, INTERESTS)
}
