package controllers

import "fmt"

type InterestsController struct {
	*BaseController
}

func (auth *InterestsController) GetName() string { return auth.Name }
func (auth *InterestsController) GetPath() string { return auth.Path }

func CreateInterestsController(basePath string) *InterestsController {
	return &InterestsController{
		&BaseController{
			"InterestsController",
			fmt.Sprintf("%s/interests", basePath),
		},
	}
}
