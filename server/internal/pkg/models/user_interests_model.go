package models

import "fmt"

type UserInterestsModel struct {
	Id          int    `json:"id"`
	UserHashId  string `json:"user_hash_id,omitempty"`
	InterestsId int    `json:"interests_id"`
}

func (UserInterestsModel) TableName() string {
	return INTERESTS
}

func CreateUserInterestsTable() string {
	return fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s (
		id SERIAL PRIMARY KEY,
		user_hash_id VARCHAR(500) NOT NULL REFERENCES %s(user_hash) ON DELETE CASCADE,
		interests_id SERIAL NOT NULL REFERENCES %s(id) ON DELETE CASCADE
		)`, USER_INTERESTS, USERS, INTERESTS)
}
