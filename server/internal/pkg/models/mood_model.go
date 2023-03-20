package models

type MoodModel struct {
	BaseTypeModel
	Text string `json:"text"`
}

func (MoodModel) TableName() string {
	return MOOD
}
