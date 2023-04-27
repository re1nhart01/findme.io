package dtos

import (
	"pkg/dto"
	"regexp"
)

var AuthCheckEmailDto = dto.FieldsMapping{
	"email": &dto.FieldDto{
		Type:     "STRING",
		Required: false,
		Min:      5,
		Max:      100,
		Name:     "email",
	},
	"phone": &dto.FieldDto{
		Type:     "STRING",
		Required: false,
		Min:      5,
		Max:      100,
		Name:     "phone",
	},
}

var RegisterDto = dto.FieldsMapping{
	"email": &dto.FieldDto{
		Type:             "STRING",
		Required:         true,
		Min:              5,
		Max:              100,
		DefaultValue:     nil,
		RegexpValidation: regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`),
		Name:             "email",
	},
	"password": &dto.FieldDto{
		Type:         "STRING",
		Required:     true,
		Min:          5,
		Max:          100,
		DefaultValue: nil,
		Name:         "password",
	},
	"phone": &dto.FieldDto{
		Type:         "STRING",
		Required:     true,
		Min:          5,
		Max:          100,
		DefaultValue: nil,
		Name:         "phone",
	},
	"firstName": &dto.FieldDto{
		Type:         "STRING",
		Required:     true,
		Min:          2,
		Max:          100,
		DefaultValue: nil,
		Name:         "firstName",
	},
	"lastName": &dto.FieldDto{
		Type:         "STRING",
		Required:     true,
		Min:          2,
		Max:          100,
		DefaultValue: nil,
		Name:         "lastName",
	},
	"birthday": &dto.FieldDto{
		Type:         "STRING",
		Required:     true,
		Min:          12,
		Max:          13,
		DefaultValue: nil,
		Name:         "birthday",
	},
	"details": &dto.FieldDto{
		Type:         "STRING",
		Max:          500,
		Required:     false,
		Min:          10,
		DefaultValue: nil,
		Name:         "details",
	},
	"city": &dto.FieldDto{
		Type:             "STRING",
		Max:              500,
		Required:         true,
		DefaultValue:     nil,
		Name:             "city",
		RegexpValidation: regexp.MustCompile(`^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$`),
	},
	"country": &dto.FieldDto{
		Type:             "STRING",
		Max:              500,
		Required:         true,
		DefaultValue:     nil,
		Name:             "country",
		RegexpValidation: regexp.MustCompile(`^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$`),
	},
}
