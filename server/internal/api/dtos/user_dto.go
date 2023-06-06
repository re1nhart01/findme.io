package dtos

import (
	"pkg/dto"
	"regexp"
)

var AttachPhotoDto = &dto.FieldsMapping{
	"bucket_ids": &dto.FieldDto{
		Type:      "ARRAY",
		Required:  true,
		Min:       5,
		Max:       200,
		MaxLength: 10,
		MinLength: 1,
		Name:      "bucket_id",
	},
}

var RemovePhotoDto = &dto.FieldsMapping{
	"buckets_ids": &dto.FieldDto{
		Type:      "ARRAY",
		Required:  true,
		Min:       5,
		Max:       500,
		Name:      "buckets_ids",
		MaxLength: 10,
		MinLength: 1,
	},
}

var EditUserDto = &dto.FieldsMapping{
	"full_name": &dto.FieldDto{
		Type:             "STRING",
		Required:         false,
		Name:             "full_name",
		MaxLength:        8,
		MinLength:        10,
		RegexpValidation: regexp.MustCompile("^[A-Z][a-zA-Z]* [A-Z][a-zA-Z]*$"),
	},
	"birthday": &dto.FieldDto{
		Type:         "STRING",
		Required:     false,
		Min:          1,
		Max:          20,
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
	"gender": &dto.FieldDto{
		Type:         "STRING",
		Max:          100,
		Required:     false,
		Min:          2,
		DefaultValue: nil,
		Name:         "gender",
	},
	"looking_for": &dto.FieldDto{
		Type:         "STRING",
		Max:          100,
		Required:     false,
		Min:          2,
		DefaultValue: nil,
		Name:         "looking_for",
	},
	"mood": &dto.FieldDto{
		Type:         "STRING",
		Max:          100,
		Required:     false,
		Min:          5,
		DefaultValue: nil,
		Name:         "mood",
	},
	"relations": &dto.FieldDto{
		Type:         "STRING",
		Max:          100,
		Required:     false,
		Min:          3,
		DefaultValue: nil,
		Name:         "relations",
	},
	"city": &dto.FieldDto{
		Type:             "STRING",
		Max:              500,
		Required:         false,
		DefaultValue:     nil,
		Name:             "city",
		RegexpValidation: regexp.MustCompile(`^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$`),
	},
	"country": &dto.FieldDto{
		Type:             "STRING",
		Max:              500,
		Required:         false,
		DefaultValue:     nil,
		Name:             "country",
		RegexpValidation: regexp.MustCompile(`^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$`),
	},
}

var GeolocationDto = &dto.FieldsMapping{
	"lat": &dto.FieldDto{
		Type:         "FLOAT",
		Max:          500,
		Required:     false,
		Min:          0,
		DefaultValue: nil,
		Name:         "details",
	},
	"long": &dto.FieldDto{
		Type:         "FLOAT",
		Max:          500,
		Required:     false,
		Min:          0,
		DefaultValue: nil,
		Name:         "details",
	},
}

var EditUserPreferencesDto = &dto.FieldsMapping{
	"theme": &dto.FieldDto{
		Type:     "BOOL",
		Required: false,
		Name:     "theme",
	},
	"lang": &dto.FieldDto{
		Type:     "STRING",
		Required: false,
		Name:     "lang",
		Min:      1,
		Max:      5,
	},
	"muted": &dto.FieldDto{
		Type:     "BOOL",
		Required: false,
		Name:     "muted",
	},
	"mega_notification": &dto.FieldDto{
		Type:     "BOOL",
		Required: false,
		Name:     "mega_notification",
	},
	"emergency_alert": &dto.FieldDto{
		Type:     "STRING",
		Required: false,
		Min:      20,
		Max:      250,
		Name:     "emergency_alert",
	},
}
