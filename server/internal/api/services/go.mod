module services

go 1.20

replace internal/pg_database => ./../../pkg/pg_database

replace internal/env => ./../../pkg/env

replace pkg/cryptography => ./../../../pkg/cryptography

replace internal/models => ../../pkg/models

replace pkg/jwts => ./../../../pkg/jwts

require (
	internal/env v0.0.0-00010101000000-000000000000
	internal/models v0.0.0-00010101000000-000000000000
	internal/pg_database v0.0.0-00010101000000-000000000000
	pkg/cryptography v0.0.0-00010101000000-000000000000
	pkg/jwts v0.0.0-00010101000000-000000000000
)

require (
	github.com/dgrijalva/jwt-go/v4 v4.0.0-preview1 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20221227161230-091c0ba34f0a // indirect
	github.com/jackc/pgx/v5 v5.3.0 // indirect
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/jinzhu/now v1.1.5 // indirect
	github.com/joho/godotenv v1.5.1 // indirect
	golang.org/x/crypto v0.8.0 // indirect
	golang.org/x/text v0.9.0 // indirect
	gorm.io/driver/postgres v1.5.0 // indirect
	gorm.io/gorm v1.24.7-0.20230306060331-85eaf9eeda11 // indirect
)
