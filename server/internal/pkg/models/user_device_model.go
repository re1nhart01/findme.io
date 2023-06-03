package models

import (
	"fmt"
	"time"
)

type UserDeviceModel struct {
	Id         int       `json:"id"`
	UserHashId string    `json:"user_hash_id,omitempty" json:"user_hash_id,omitempty"`
	DeviceId   string    `json:"device_id,omitempty"`
	RetryCount int       `json:"retry_count,omitempty"`
	RetryTime  time.Time `json:"retry_time,omitempty"`
}

func (UserDeviceModel) TableName() string {
	return USER_DEVICE
}

func CreateUserDeviceTable() string {
	return fmt.Sprintf(`
CREATE TABLE IF NOT EXISTS %s (
id SERIAL PRIMARY KEY,
user_hash_id VARCHAR(500) NOT NULL REFERENCES %s(user_hash) ON DELETE CASCADE,
device_id VARCHAR(500) NOT NULL,
retry_count INTEGER CHECK(retry_count > 0 AND retry_count <= 20),
retry_time DATE NOT NULL
)`, USER_DEVICE, USERS)
}
