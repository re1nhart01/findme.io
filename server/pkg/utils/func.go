package utils

import (
	"strings"
)

func Includes[T comparable](list []T, item T) (bool, T, int) {
	if len(list) == 0 {
		return false, item, -1
	}
	for k, v := range list {
		if v == item {
			return true, item, k
		}
	}
	return false, item, -1
}

type TagsInterests interface {
	GetId() int
}

type listOf []TagsInterests

func GetIntListFromModel(list listOf) []int {
	result := []int{}
	for _, v := range list {
		result = append(result, v.GetId())
	}
	return result
}

func ShortInclude[T comparable](list []T, item T) bool {
	if len(list) == 0 {
		return false
	}
	for _, v := range list {
		if v == item {
			return true
		}
	}
	return false
}

func Some[T comparable](list []T, callback func(item T, index int) bool) bool {
	result := true
	if len(list) == 0 {
		return false
	}
	for k, v := range list {
		if callback(v, k) {
			result = true
		}
	}
	return result
}

func Every[T comparable](list []T, callback func(item T, index int) bool) bool {
	result := true
	if len(list) == 0 {
		return false
	}
	for k, v := range list {
		if !callback(v, k) {
			result = false
		}
	}
	return result
}

func IsArrayIncludes[T comparable](list, list2 []T) bool {
	return Every(list, func(item T, index int) bool {
		inc, _, _ := Includes(list2, item)
		return inc
	})
}

func HandleNilValues(val any, defaultVal any) any {
	if val == nil {
		return defaultVal
	}
	return val
}

func CheckIsValidContentType(needable string, list []string) bool {
	for _, v := range list {
		subStr := strings.Contains(v, needable)
		if subStr {
			return true
		}
	}
	return false
}

func GetFileExtensionFromFile(fileName string) string {
	splitted := strings.Split(fileName, ".")
	if len(splitted) < 2 {
		return ""
	}
	return splitted[1]
}
