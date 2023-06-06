package dtos

import "pkg/dto"

var FavoritesIdDto = &dto.FieldsMapping{
	"user_refer_id": &dto.FieldDto{
		Type:     "STRING",
		Required: false,
		Min:      5,
		Max:      100,
		Name:     "user_hash_id",
	},
}
