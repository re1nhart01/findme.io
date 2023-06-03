package controllers

import "fmt"

type TagsController struct {
	*BaseController
}

func (auth *TagsController) GetName() string { return auth.Name }
func (auth *TagsController) GetPath() string { return auth.Path }

func CreateTagsController(basePath string) *TagsController {
	return &TagsController{
		&BaseController{
			"TagsController",
			fmt.Sprintf("%s/tags", basePath),
		},
	}
}
