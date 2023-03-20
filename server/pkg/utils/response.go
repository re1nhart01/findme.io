package utils

import "net/http"

func GiveResponse(statusCode int, statusMessage string) map[string]any {
	return map[string]any{
		"statusCode":    statusCode,
		"statusMessage": statusMessage,
	}
}

func GiveResponseWithData[T comparable](statusCode int, statusMessage string, data T) map[string]any {
	return map[string]any{
		"statusCode":    statusCode,
		"statusMessage": statusMessage,
		"data":          data,
	}
}

func GiveOKResponseWithData[T comparable](data T) map[string]any {
	return map[string]interface{}{
		"statusCode":    http.StatusOK,
		"statusMessage": "Accepted",
		"data":          data,
	}
}

func GiveOKResponse() map[string]any {
	return map[string]any{
		"statusCode":    http.StatusOK,
		"statusMessage": "Accepted",
	}
}
