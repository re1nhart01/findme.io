module external

go 1.20

replace internal/env => ./../env

require internal/env v0.0.0-00010101000000-000000000000

require github.com/joho/godotenv v1.5.1 // indirect
