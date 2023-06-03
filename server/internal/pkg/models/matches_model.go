package models

import (
	"fmt"
	"time"
)

type MatchesModel struct {
	Id              string    `json:"id"`
	FirstUserMatch  string    `json:"first_user_match,omitempty"`
	SecondUserMatch string    `json:"second_user_match,omitempty"`
	Op              string    `json:"operation"`
	TimeToLive      time.Time `json:"ttl"`
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
	ttl DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL '7 DAY')
	)
`, MATCHES, USERS, USERS, operations)
}
