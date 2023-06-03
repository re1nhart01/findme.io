package models

import (
	"fmt"
	"time"
)

type MatchesModel struct {
	BaseTypeModel
	FirstUser       UserModel `gorm:"foreignKey:FirstUserMatch"`
	FirstUserMatch  string    `json:"first_user_match,omitempty"`
	SecondUser      UserModel `gorm:"foreignKey:SecondUserMatch"`
	SecondUserMatch string    `json:"second_user_match,omitempty"`
	Op              string    // LIKE OR DISLIKE
	TimeToLive      time.Time
}

func (MatchesModel) TableName() string {
	return MATCHES
}

const operations = "('LIKE', 'DISLIKE')"

func CreateMatchesTable() string {
	return fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s (
	id SERIAL PRIMARY KEY,
	first_user_match VARCHAR(500) NOT NULL REFERENCES %s(user_hash) ON DELETE CASCADE,
	second_user_match VARCHAR(500) NOT NULL REFERENCES %s(user_hash) ON DELETE CASCADE,
	operation VARCHAR(500) NOT NULL CHECK(operation IN %s),
	ttl DATE NOT NULL DEFAULT (CURRENT_DATE() + INTERVAL 7 DAY)
	)
`, MATCHES, USERS, USERS, operations)
}
