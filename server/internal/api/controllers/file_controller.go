package controllers

import "fmt"

type FileController struct {
	*BaseController
}

func (file *FileController) GetName() string { return file.Name }
func (file *FileController) GetPath() string { return file.Path }

func CreateFileController(basePath string) *FileController {
	return &FileController{
		&BaseController{
			"AuthController",
			fmt.Sprintf("%s/files", basePath),
		},
	}
}
