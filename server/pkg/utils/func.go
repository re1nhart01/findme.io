package utils

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
