package middlewares

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"pkg/jwts"
	"pkg/utils"
	"strings"
)

// AuthMiddleware Bearer@token
func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		header := ctx.Request.Header.Get("Authorization")
		if len(header) < 10 {
			ctx.JSON(http.StatusUnauthorized, utils.GiveResponse(http.StatusUnauthorized, "Unauthorized"))
			return
		}
		unpackedHeader := strings.Split(header, "@")
		if len(unpackedHeader) != 2 {
			ctx.JSON(http.StatusUnauthorized, utils.GiveResponse(http.StatusUnauthorized, "Unauthorized"))
			return
		}
		userHash, id, expired, err := jwts.ValidateToken(unpackedHeader[1])
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, utils.GiveResponse(http.StatusUnauthorized, "Unauthorized"))
			return
		}
		ctx.Set("user", map[string]any{
			"user_hash":    userHash,
			"user_id":      id,
			"when_expired": expired,
		})
		ctx.Next()
	}
}
