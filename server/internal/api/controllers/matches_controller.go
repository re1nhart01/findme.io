package controllers

import "fmt"

type MatchesController struct {
	*BaseController
}

func (matches *MatchesController) GetName() string { return matches.Name }
func (matches *MatchesController) GetPath() string { return matches.Path }

func CreateMatchesController(basePath string) *MatchesController {
	return &MatchesController{
		&BaseController{
			"MatchesController",
			fmt.Sprintf("%s/matches", basePath),
		},
	}
}
