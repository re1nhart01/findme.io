package controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"pkg/jwts"
)

type AuthController struct {
	*BaseController
}

func (auth *AuthController) GetName() string { return auth.Name }
func (auth *AuthController) GetPath() string { return auth.Path }

func (auth *AuthController) Register(ctx *gin.Context) {

}

func (auth *AuthController) Login(ctx *gin.Context) {
	a, _ := jwts.CreateToken("aboba", 10, 2000000)
	b, c, d, _ := jwts.ValidateToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Nzk1MTU5OTQuNTkwMDIxOCwiaWF0IjoxNjc5NTE1OTk0LjU4ODAyMiwic3ViIjoidXNlciBjbGFpbSB0b2tlbiIsInVzZXJfaGFzaCI6ImFib2JhIiwiaWQiOjEwfQ.bLE58UKM9LMtdETD9MJDiuys9Bda3efge6UsGnxBB-Y")
	fmt.Println(jwts.IsTokenExpired("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Nzk1MTU5OTQuNTkwMDIxOCwiaWF0IjoxNjc5NTE1OTk0LjU4ODAyMiwic3ViIjoidXNlciBjbGFpbSB0b2tlbiIsInVzZXJfaGFzaCI6ImFib2JhIiwiaWQiOjEwfQ.bLE58UKM9LMtdETD9MJDiuys9Bda3efge6UsGnxBB-Y"))
	ctx.JSON(200, map[string]any{
		a:   "a",
		"b": b,
		"c": c,
		"d": d,
	})
}

func (auth *AuthController) VerifyCode(ctx *gin.Context) {

}

func (auth *AuthController) Delete(ctx *gin.Context) {

}

func CreateAuthController() *AuthController {
	return &AuthController{
		&BaseController{
			"AuthController",
			"/auth",
		},
	}
}
