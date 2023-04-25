package models

import (
	"time"
)

// password, email, fullName, birth, details, gender, avatar
// userhash, active, popularity,

type UserModel struct {
	BaseTypeModel
	UserHash   string    `json:"user_hash,omitempty"`
	Avatar     string    `json:"avatar,omitempty"`
	FullName   string    `json:"full_name,omitempty"`
	Birth      time.Time `json:"birth"`
	Details    string    `json:"details,omitempty"`
	Gender     string    `json:"gender,omitempty"`
	Password   string    `json:"password,omitempty"`
	Email      string    `json:"email,omitempty"`
	MoodId     int       `json:"mood_id,omitempty"`
	MoodModel  MoodModel `gorm:"foreignKey:MoodId"`
	Active     bool      `json:"active,omitempty"`
	Popularity float64   `json:"popularity,omitempty"`
	City       string    `json:"city,omitempty"`
	Country    string    `json:"country,omitempty"`
}

func (UserModel) TableName() string {
	return USERS
}
