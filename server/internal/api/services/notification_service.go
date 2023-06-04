package services

import (
	"internal/models"
	"internal/pg_database"
	"pkg/notifications"
)

type NotificationService struct {
	*BaseService
}

const TITLE = "Find Me Notification"

const (
	PUSH_BODY_MATCH           = "Hey, somebody like you. Lets get dig into, to realize who is it"
	PUSH_BODY_MUTUAL_MATCH    = "Woaow, looks like somebody is got mutual match with you."
	PUSH_BODY_REMOVE_MATCH    = "Somebody remove you from matches :("
	PUSH_BODY_UPDAT_MATCH     = "Somebody change his(her) mind about you :/"
	PUSH_BODY_FAVORITES_MATCH = "Looks like somebody add you into his(her) favorites :)"
)

func (notify *NotificationService) GetService() any {
	return notify
}

func (notify *NotificationService) SendPushByToken(userHash string, body string, data map[string]string) bool {
	model := models.UserPreferenceModel{}
	if res := pg_database.GetDatabaseInstance().Instance.Table(models.USER_PREFERENCES).Where("user_hash_id = ?", userHash).First(&model); res.Error != nil {
		return false
	}
	if model.NotificationToken == "" {
		return false
	}
	if err := notifications.SendMessage(TITLE, body, model.NotificationToken, data); err != nil {
		return false
	}
	return true
}
