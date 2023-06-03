package models

import "fmt"

type NotificationsModel struct {
	Id          int    `json:"id"`
	UserHashId        string `json:"user_hash_id,omitempty" json:"user_hash_id,omitempty"`
	NotificationText  string `json:"notification_text,omitempty"`
	NotificationLabel string `json:"notification_label,omitempty"`
	Importance        int8   `json:"importance,omitempty"`
}

func (NotificationsModel) TableName() string {
	return NOTIFICATIONS
}

func CreateNotificationTable() string {
	return fmt.Sprintf(`
	CREATE TABLE IF NOT EXISTS %s (
	id SERIAL PRIMARY KEY,
	user_hash_id VARCHAR(500) NOT NULL REFERENCES %s(user_hash) ON DELETE CASCADE,
	notification_label VARCHAR(500) NOT NULL,
	notification_text VARCHAR(500) NOT NULL
)`, NOTIFICATIONS, USERS)
}
