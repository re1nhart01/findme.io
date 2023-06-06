package dtos

import "pkg/dto"

var AddOrRemoveDto = &dto.FieldsMapping{
	"tag_list": &dto.FieldDto{
		Type:      "ARRAY",
		Required:  true,
		Min:       1,
		Max:       500,
		Name:      "tag_list",
		MinLength: 1,
		MaxLength: 50,
	},
	"operation": &dto.FieldDto{
		Type:     "STRING",
		Required: true,
		Min:      2,
		Max:      500,
		Name:     "operation",
	},
}

var UpdateInterestsDto = &dto.FieldsMapping{
	"interests_list": &dto.FieldDto{
		Type:      "ARRAY",
		Required:  true,
		Name:      "interests_list",
		MaxLength: 10,
		MinLength: 0,
	},
}
