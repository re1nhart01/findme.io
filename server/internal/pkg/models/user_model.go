package models

import (
	"fmt"
	"time"
)

// password, email, fullName, birth, details, gender, avatar
// userhash, active, popularity,

type UserModel struct {
	Id         int       `json:"id"`
	UserHash   string    `json:"user_hash"`
	FullName   string    `json:"full_name"`
	Birthday   time.Time `json:"birthday"`
	Details    string    `json:"details"`
	Gender     string    `json:"gender"`
	LookingFor string    `json:"looking_for"`
	Password   string    `json:"password,omitempty"`
	Email      string    `json:"email"`
	Mood       string    `json:"mood"`
	Relations  string    `json:"relations"`
	Active     bool      `json:"active"`
	City       string    `json:"city"`
	Country    string    `json:"country"`
	Phone      string    `json:"phone"`
	Lat        float64   `json:"lat"`
	Long       float64   `json:"long"`
	CreatedAt  time.Time `json:"created_at"`
}

type UserModelFull struct {
	Id         int                  `json:"id"`
	UserHash   string               `json:"user_hash"`
	FullName   string               `json:"full_name"`
	Birthday   time.Time            `json:"birthday"`
	Details    string               `json:"details"`
	Gender     string               `json:"gender"`
	LookingFor string               `json:"looking_for"`
	Password   string               `json:"password,omitempty"`
	Email      string               `json:"email"`
	Mood       string               `json:"mood"`
	Relations  string               `json:"relations"`
	Active     bool                 `json:"active"`
	City       string               `json:"city"`
	Country    string               `json:"country"`
	Phone      string               `json:"phone"`
	Lat        float64              `json:"lat"`
	Long       float64              `json:"long"`
	Interests  []UserInterestsModel `json:"interests"`
	Tags       []TagsModel          `json:"tags"`
	Photos     []string             `json:"photos"`
}

func CreateUserTable() string {
	return fmt.Sprintf(`CREATE TABLE IF NOT EXISTS %s (
    id SERIAL PRIMARY KEY,
    user_hash VARCHAR(500) NOT NULL UNIQUE,
    full_name VARCHAR(500) NOT NULL,
    birthday DATE NOT NULL DEFAULT CURRENT_DATE,
    details VARCHAR(500),
    gender VARCHAR(500) DEFAULT 'male',
	looking_for VARCHAR(500) NOT NULL,
    password VARCHAR(500) NOT NULL,
    email VARCHAR(500) CHECK (email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
    phone VARCHAR(500) CHECK (LEFT(phone,1) = '+'),
    mood VARCHAR(500) NOT NULL DEFAULT 'Here to date',
    relations VARCHAR(500) NOT NULL DEFAULT 'Single',
    active BOOL DEFAULT true,
    city VARCHAR(500) NOT NULL,
    country VARCHAR(500) NOT NULL,
	lat NUMERIC NOT NULL DEFAULT 0,
	long NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
)`, USERS)
}

func (UserModel) TableName() string {
	return USERS
}
