package models

import (
	"fmt"
	"time"
)

type FullUserMatchModel struct {
	Id              int       `json:"id"`
	UserHash        string    `json:"user_hash"`
	FirstUserMatch  string    `json:"first_user_match,omitempty"`
	SecondUserMatch string    `json:"second_user_match,omitempty"`
	Operation       string    `json:"operation"`
	Ttl             time.Time `json:"ttl"`
	FullName        string    `json:"full_name"`
	Details         string    `json:"details"`
	Lat             float64   `json:"lat"`
	Long            float64   `json:"long"`
	Birthday        time.Time `json:"birthday"`
	StorageBucketId string    `json:"storage_bucket_id"`
}

type MatchesModel struct {
	Id              int       `json:"id"`
	FirstUserMatch  string    `json:"first_user_match,omitempty"`
	SecondUserMatch string    `json:"second_user_match,omitempty"`
	Operation       string    `json:"operation"`
	Ttl             time.Time `json:"ttl"`
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
