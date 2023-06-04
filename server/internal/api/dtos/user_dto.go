package dtos

import "pkg/dto"

var AttachPhotoDto = &dto.FieldsMapping{
	"bucket_id": &dto.FieldDto{
		Type:     "STRING",
		Required: true,
		Min:      5,
		Max:      200,
		Name:     "bucket_id",
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
