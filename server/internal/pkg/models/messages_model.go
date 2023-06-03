package models

import "fmt"

type UserMessagesModel struct {
	Id          int    `json:"id"`
	Sender      string `json:"sender"`
	Recipient   string `json:"recipient"`
	Message     string `json:"message"`
	Status      int    `json:"status"`
	Type        int    `json:"type"`
	MessageHash string `json:"messageHash"`
}

func CreateUserMessagesTable() string {
	return fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s (
id SERIAL PRIMARY KEY,
sender VARCHAR(500) NOT NULL UNIQUE REFERENCES users(user_hash) ON DELETE CASCADE,
recipient VARCHAR(500) NOT NULL UNIQUE REFERENCES users(user_hash) ON DELETE CASCADE,
message VARCHAR(5000) NOT NULL,
status smallint NOT NULL DEFAULT 0,
type smallint NOT NULL DEFAULT 0,
message_hash VARCHAR(500) NOT NULL UNIQUE
)`, USERS_MESSAGES)
}

func (UserMessagesModel) TableName() string {
	return USERS_MESSAGES
}
