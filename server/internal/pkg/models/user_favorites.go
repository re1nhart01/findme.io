package models

import "fmt"

type UserFavoritesModel struct {
	Id       int    `json:"id"`
	Owner    string `json:"owner"`
	Accessor string `json:"accessor"`
}

func (UserFavoritesModel) TableName() string {
	return USER_FAVORITES
}

func CreateFavoritesTable() string {
	return fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s (
id SERIAL PRIMARY KEY,
owner VARCHAR(500) NOT NULL REFERENCES %s(user_hash) ON DELETE CASCADE,
accessor VARCHAR(500) NOT NULL REFERENCES %s(user_hash) ON DELETE CASCADE
)`, USER_FAVORITES, USERS, USERS)
}
