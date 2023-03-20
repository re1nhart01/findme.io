package models

type MoodModel struct {
	BaseTypeModel
	Text string `json:"text"`
}
