package dtos

import "pkg/dto"

var AuthCheckEmailDto = dto.FieldsMapping{
	"email": &dto.FieldDto{
		Type:     "STRING",
		Required: true,
		Min:      5,
		Max:      100,
		Name:     "email",
	},
}
