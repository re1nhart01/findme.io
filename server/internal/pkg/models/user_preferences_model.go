package models

type UserPreferenceModel struct {
	BaseTypeModel
	UserModel        UserModel          `gorm:"foreignKey:UserHashId" json:"user"`
	UserHashId       string             `json:"user_hash_id" json:"user_hash_id,omitempty"`
	Theme            bool               `json:"theme,omitempty"`
	Lang             string             `json:"lang,omitempty"`
	Muted            bool               `json:"muted,omitempty"`
	MegaNotification bool               `json:"mega_notification,omitempty"`
	Coords           map[string]float64 `gorm:"type:point" json:"coords,omitempty"`
}
