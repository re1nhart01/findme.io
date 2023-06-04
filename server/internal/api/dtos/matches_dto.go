package dtos

import "pkg/dto"

/**
FirstUserMatch  string    `json:"first_user_match,omitempty"`
SecondUserMatch string    `json:"second_user_match,omitempty"`
Op              string    `json:"operation"`
TimeToLive      time.Time `json:"ttl"`
*/

var MatchUserDto = &dto.FieldsMapping{
	"user_hash_refer": &dto.FieldDto{
		Type:     "STRING",
		Required: true,
		Min:      10,
		Max:      100,
		Name:     "user_hash_refer",
	},
	"operation": &dto.FieldDto{ // pass / match
		Type:     "STRING",
		Required: true,
		Min:      3,
		Max:      500,
		Name:     "operation",
	},
}
