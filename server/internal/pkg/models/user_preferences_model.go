package models

import (
	"fmt"
)

type UserPreferenceModel struct {
	Id                int    `json:"id"`
	UserHashId        string `json:"user_hash_id"`
	Theme             bool   `json:"theme"`
	Lang              string `json:"lang"`
	Muted             bool   `json:"muted"`
	EmergencyAlert    bool   `json:"emergency_alert"`
	NotificationToken string `json:"notification_token"`
}

func CreateUserPreferencesTable() string {
	return fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s (
    id SERIAL PRIMARY KEY,
    user_hash_id VARCHAR(500) NOT NULL UNIQUE REFERENCES users(user_hash) ON DELETE CASCADE,
    theme BOOL NOT NULL DEFAULT false,
    lang VARCHAR(20) NOT NULL DEFAULT 'en-US',
    muted BOOL DEFAULT false,
    emergency_alert BOOL DEFAULT false,
	notification_token VARCHAR(500) NOT NULL UNIQUE
)`, USER_PREFERENCES)
}

func (UserPreferenceModel) TableName() string {
	return USER_PREFERENCES
}
