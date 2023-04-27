package controllers

import (
	ApplicationDto "app/dtos"
	"app/services"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"pkg/cryptography"
	"pkg/dto"
	"pkg/utils"
	"strconv"
	"time"
)

type AuthController struct {
	*BaseController
	AuthService *services.AuthService
}

func (auth *AuthController) GetName() string { return auth.Name }
func (auth *AuthController) GetPath() string { return auth.Path }

func (auth *AuthController) Register(ctx *gin.Context) {
	data, ok := ctx.Get("body")
	if !ok {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!"))
		return
	}
	validatedFields, errors := dto.ValidateModelWithDto(data.(map[string]any), ApplicationDto.RegisterDto, &dto.ErrorList{})

	if len(*errors) == 0 {
		fullName := fmt.Sprintf("%s %s", validatedFields["firstName"].(string), validatedFields["lastName"].(string))
		hashedPassword := cryptography.HashPassword(validatedFields["password"].(string))
		castedBirthday, _ := strconv.ParseInt(validatedFields["birthday"].(string), 10, 64)

		userHash, createUserError := auth.AuthService.CreateInitialUser(
			validatedFields["email"].(string),
			validatedFields["phone"].(string),
			fullName,
			hashedPassword,
			validatedFields["country"].(string),
			validatedFields["city"].(string),
			utils.HandleNilValues(validatedFields["details"], "").(string),
			time.UnixMilli(castedBirthday))

		if isUserCreateError := utils.HandleDefaultError(createUserError, ctx); isUserCreateError {
			return
		}

		createPreferencesError := auth.AuthService.CreateUserPreferences(userHash)
		if isUserCreateError := utils.HandleDefaultError(createPreferencesError, ctx); isUserCreateError {
			return
		}

		ctx.JSON(http.StatusOK, utils.GiveOKResponse())
	} else {
		ctx.JSON(http.StatusUnauthorized, utils.GiveResponseWithData[*map[string]any](
			http.StatusUnauthorized,
			"Invalid register data",
			&map[string]any{
				"errors": errors,
			}))
	}
}

func (auth *AuthController) HasEmailOrPhone(ctx *gin.Context) {
	data, ok := ctx.Get("body")
	if !ok {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!"))
		return
	}
	validatedData, errors := dto.ValidateModelWithDto(data.(map[string]any), ApplicationDto.AuthCheckEmailDto, &dto.ErrorList{})
	if len(*errors) == 0 {
		res := map[string]any{}
		if validatedData["email"] != nil {
			isExistsEmail := auth.AuthService.CheckEmailExists(validatedData["email"].(string))
			res["isEmailExists"] = isExistsEmail
		}
		if validatedData["phone"] != nil {
			isExistsEmail := auth.AuthService.CheckPhoneExists(validatedData["phone"].(string))
			res["isPhoneExists"] = isExistsEmail
		}
		ctx.JSON(http.StatusOK, utils.GiveOKResponseWithData[*map[string]any](&res))
		return
	} else {
		ctx.JSON(http.StatusOK, utils.GiveOKResponseWithData[*map[string]any](&map[string]any{
			"errors": errors,
		}))
	}
}

func (auth *AuthController) Login(ctx *gin.Context) {

}

func (auth *AuthController) VerifyCode(ctx *gin.Context) {

}

func (auth *AuthController) Delete(ctx *gin.Context) {

}

func CreateAuthController(basePath string) *AuthController {
	return &AuthController{
		&BaseController{
			"AuthController",
			fmt.Sprintf("%s/auth", basePath),
		},
		&services.AuthService{},
	}
}
