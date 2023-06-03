package controllers

import "fmt"

type NotificationsController struct {
	*BaseController
}

func (auth *NotificationsController) GetName() string { return auth.Name }
func (auth *NotificationsController) GetPath() string { return auth.Path }

func CreateNotificationsController(basePath string) *NotificationsController {
	return &NotificationsController{
		&BaseController{
			"NotificationsController",
			fmt.Sprintf("%s/notifications", basePath),
		},
	}
}
