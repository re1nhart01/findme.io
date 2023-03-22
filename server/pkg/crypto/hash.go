package crypto

import (
	"crypto/sha1"
	"fmt"
)

func getSha1(serverHash string, salt string) string {
	pwd := sha1.New()
	pwd.Write([]byte(serverHash))
	pwd.Write([]byte(salt))
	return fmt.Sprintf("%x", pwd.Sum(nil))
}

func MakePasswordHash(serverHash string, salt string) string {
	pwd := sha1.New()
	pwd.Write([]byte(serverHash))
	pwd.Write([]byte(salt))
	return fmt.Sprintf("%x", pwd.Sum(nil))
}
